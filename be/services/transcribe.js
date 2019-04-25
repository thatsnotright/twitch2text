let transcribe;

/**
 * Transcribe an S3 mp4 to text
 * @param {string} path The bucket key name or path to resource
 */
async function startTranscription(path) {
  const config = {
    LanguageCode: 'en-US',
    Media: {
      MediaFileUri: `https://s3.amazonaws.com/twitch2text-media/${path}.mp4`, // TODO don't hardcode this URL or file extension
    },
    MediaFormat: 'mp4',
    // MediaSampleRateHertz: '16000', // if 60 hertz what does 120 do?
    OutputBucketName: 'twitch2text-media',
    Settings: {
      ChannelIdentification: false,
    },
    TranscriptionJobName: path,
  };

  const job = new Promise((resolve, reject) => {
    transcribe.startTranscriptionJob(config, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
  const result = await job;
  return result.TranscriptionJob.TranscriptionJobName;
}

/**
 * Accepts an AWS transcribe object and provides:
 *  startTranscription()
 */
module.exports = inTrans => {
  transcribe = inTrans;
  return {
    startTranscription,
  };
};
