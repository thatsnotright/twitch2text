const Router = require('koa-router');
const koaBody = require('koa-body');
const fetch = require('node-fetch');
const getMeta = require('lets-get-meta');
const uuid = require('uuid');
const curry = require('curry');

const clipsRouter = new Router({
  prefix: '/clips',
});

/**
 * Return a list of clips for the selected Twitch users
 *
 * For now this is hardcoded to one software engineer
 */
const get = async (twitch, ctx) => {
  const [talima] = await twitch.sendHelixRequest('users?login=teamTALIMA');
  const { id } = talima;
  const url = `clips?broadcaster_id=${id}`;
  console.log(url);
  ctx.body = await twitch.sendHelixRequest(url);
};

/**
 * Download a specific clip by clip URL and plop it in s3 for processng
 */
const download = async (s3, db /* , ctx */) => {
  // TODO read clipUrl and clipId from POST body ctx
  const clipUrl = 'https://clips.twitch.tv/SucculentHandsomeDolphinBigBrother';
  const main = await fetch('https://clipr.xyz/');
  const result = getMeta(await main.text());
  const body = JSON.stringify({ clip_url: clipUrl });

  const downloadInfo = await fetch('https://clipr.xyz/api/grabclip', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: `X-CSRF-TOKEN=${result['csrf-token']}`,
    },
    body,
  });
  const { download_url } = await downloadInfo.json(); // eslint-disable-line
  const path = uuid.v4();
  s3.toS3(path, download_url); // eslint-disable-line
  return db.associateClip(path, download_url);
};

/**
 * Clip Router requires the app, an s3 module, the db module and access to the Twitch API
 */
module.exports = (app, s3, db, twitch) => {
  clipsRouter.get('/download', koaBody(), curry.to(3, download)(s3, db));
  clipsRouter.get('/', curry.to(2, get)(twitch));
  app.use(clipsRouter.routes());
};
