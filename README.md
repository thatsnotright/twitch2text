# README.md

Twitch To Text is a demo project using Amazon's Transcribe API to automatically generate Closed Captioning of a selected Twitch Live Stream

# Reality

I was able to figure out how to grab the URL for a Twitch clip mp4 via clipr service, and then able to download this clip to s3 and transcribe it.  I was surprised how hard Twitch makes it to get live stream information, though given their use of DAI I should have figure they would want to retain as much control as possible over their video player experience (also this problem would likely be solved with MPEG-DASH and server side DAI, though HLS can do server side DAI as well but I suspect Twitch does not do server side DAI).

Where I am:

1. Back end responds to these API calls:
  1. /api/ -> Retrive a list of users (hard coded to one twitch streamer on the server for now)
  2. /api/clips -> Retrive a list of clips for a given user (user is again hard coded)
  3. /api/clips/download -> Download and transcribe a Twitch clip (clip URL is hard coded)
2. Backend deploys as a lambda function
  1. https://7pvyk13dad.execute-api.us-east-1.amazonaws.com/dev/api/users
  2. https://7pvyk13dad.execute-api.us-east-1.amazonaws.com/dev/api/clips
  3. https://7pvyk13dad.execute-api.us-east-1.amazonaws.com/dev/api/clips/download
3. Frontend is a create-react-app eject, but is not fully configured to be hosted on S3 nor will it hit the right API
  1. CloudFront will be used to proxy the API requests at /api/ to the lambda
  2. S3 will host static webpack bundle

# Getting Started

See fe/README.md for specifics on the React front end, hosted at https://rob.elsner.dev/ttt/

See be/README.md for specifics on the nodejs back end, hosted as an AWS lambda function
