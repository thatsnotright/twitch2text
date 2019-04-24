const TwitchHelix = require('twitch-helix');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const twitch = new TwitchHelix({
  clientId,
  clientSecret,
});

module.exports = twitch;
