# Twitter Engager
A Node.js Twitter bot to retweet, favorite and tweet messages.

Based off a turiorl on [Hackernoon](https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c080) I created a Node.js Twitter bot that you can add Tweets that will randomly get tweeted. The bot will also randomly favorite and retweet tweets based on hashtags you you provide it.

## Configuring and granting permissions from Twitter API
After logging to to your Twitter account, follow to this link: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new) to create a new application. Fill out the necessary fields in the form click on the button Create Your Twitter Application. After creating the application, look for ‘Keys and Access Tokens’ under the nav-panes and click on `Generate Token Actions` and then copy:

- Consumer Key
- Consumer Secret
- Access Token
- Access Token Secret

Change the filename of `config-example.json` to `config.js`. Then open the `config.js` file and paste all four values inside it.

## Create your bot

`npm install`

Choose hastags you'd like your bot to interact with and add them to `hastags.json`.

Start adding Tweets to `tweets.json` you'd like your bot to randomly Tweet.

Once everything is ready run `npm start` and your bot will start working!
