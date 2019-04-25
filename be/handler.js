const serverless = require('serverless-http');
const Koa = require('koa');
const Router = require('koa-router');
const AWS = require('aws-sdk');

const config = new AWS.Config({
  region: 'us-east-1',
  apiVersion: '2012-08-10',
});

const twitch = require('./twitch');
const s3 = require('./services/s3')(new AWS.S3(config));
const db = require('./services/db')(new AWS.DynamoDB(config));

const app = new Koa();
const router = new Router({
  prefix: '/',
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

/**
 * Get a list of potential streams or clips which can be textualized
 *
 * For now this is hard coded and should be moved to its own route file
 */
router.get('/', async ctx => {
  // TODO stream this response if the headers don't give away secrets
  ctx.body = await twitch.sendHelixRequest('users?login=teamTALIMA');
});
app.use(router.routes());

// Register route handlers below
require('./routes/clips')(app, s3, db, twitch);

if (process.env.CMD) app.listen(8080);

module.exports.handler = serverless(app);
