const serverless = require('serverless-http');
const Koa = require('koa');
const twitch = require('./twitch');

const app = new Koa();

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports.handler = serverless(app);
