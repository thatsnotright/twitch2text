let db;

/**
 * Associate a clip by Twitch clip ID to an s3 bucket key
 * @param {string} path The bucket key name or path to resource
 * @param {string} clipId The twitch clip id
 */
async function associateClip(path, clipId) {
  const params = {
    TableName: 'TWITCH_CLIPS',
    Item: {
      BUCKET_KEY: { S: path },
      CLIP_ID: { S: clipId },
    },
  };

  return new Promise((resolve, reject) => {
    db.putItem(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ success: true, data });
      }
    });
  });
}

module.exports = inDb => {
  db = inDb;
  return {
    associateClip,
  };
};
