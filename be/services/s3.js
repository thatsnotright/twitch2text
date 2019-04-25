const request = require('request-promise');

let s3;

const options = {
  encoding: null,
};

/**
 * Stream URI in to the S3 bucket at path
 * @param {string} path - Resulting key/filename in S3
 * @param {string} uri - URI of source file
 */
async function load(path, uri) {
  options.uri = uri;
  const body = await request(options);

  const uploadResult = await s3
    .upload({
      Bucket: 'twitch2text-media',
      Key: path,
      Body: body,
    })
    .promise();
  return uploadResult;
}

module.exports = inS3 => {
  s3 = inS3;
  return {
    toS3: load,
  };
};
