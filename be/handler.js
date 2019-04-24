const serverless = require('serverless-http');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const twitch = require('./twitch');

const app = new Koa();
const router = new Router({
  prefix: '/',
});
const clipsRouter = new Router({
  prefix: '/clips',
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

clipsRouter.get('/', async (ctx, next) => {
  const [talima, ...rest] = await twitch.sendHelixRequest('users?login=teamTALIMA');
  const { id } = talima;
  const url = `clips?broadcaster_id=${id}`;
  console.log(url);
  ctx.body = await twitch.sendHelixRequest(url);
});

router.get('/', async (ctx, next) => {
  // TODO stream this response if the headers don't give away secrets
  ctx.body = await twitch.sendHelixRequest('users?login=teamTALIMA');
});
app.use(router.routes());
app.use(clipsRouter.routes());

if (process.env.CMD) app.listen(8080);

module.exports.handler = serverless(app);
