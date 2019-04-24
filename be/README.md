# Getting Started

Ensure you have a working "serverless" command or "npx" command.

To deploy, ensure you have configured the AWS client ~/.aws/credentials correctly

Run
'''
nmx serverless deploy
'''

And you should be greeted with a working lambda function exposing the endpoints.

## API

### GET /
Returns the user information for teamTALIMA

### GET /clip
Returns the first clip from teamTALIMA

Previewing the embed gives us a media URL such as 
'''
https://clips-media-assets2.twitch.tv/23981882576-offset-15951.493-18.mp4
'''

and a preview image url
'''
https://clips-media-assets2.twitch.tv/23981882576-offset-14988-40-preview-480x272.jpg
'''

not exactly helpful twitch...