const Router = require('koa-router');
const koaBody = require('koa-body');
const fetch = require('node-fetch');
const getMeta = require('lets-get-meta');
const uuid = require('uuid');
const curry = require('curry');

const clipsRouter = new Router({
  prefix: '/api/clips',
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
const download = async (s3, db, transcribe, ctx) => {
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
  s3.toS3(`${path}.mp4`, download_url)
    .then(async () => {
      const transKey = await transcribe.startTranscription(path);
      console.log(transKey); // TODO use this?  this comes back when the job is done
    })
    .catch(e => {
      console.error(e);
      // TODO mark failed s3 upload
    });
  const dbRes = await db.associateClip(path, download_url);
  ctx.body = dbRes;
};

/**
 * Clip Router requires the app, an s3 module, the db module and access to the Twitch API
 */
module.exports = (app, s3, db, transcribe, twitch) => {
  clipsRouter.get('/download', curry.to(4, download)(s3, db, transcribe));
  clipsRouter.get('/', curry.to(2, get)(twitch));
  app.use(clipsRouter.routes());
};
