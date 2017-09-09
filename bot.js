const fs = require('fs');
const twit = require('twit');
const config = require('./config.js');
const hashtags = require('./hashtags.json');
const Twitter = new twit(config);

// get random value from array
const randomArray = function (arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

// POST BOT ==================================================
const post = function () {
  // get used tweets from JSON file
  fs.readFile('./used.json', 'utf8', function (err, data) {
    const used = JSON.parse(data);
    // read tweets JSON file so you can update tweets while the bot is running
    fs.readFile('./tweets.json', 'utf8', function (err, data) {
      if (err) throw err;
      const tweets = JSON.parse(data);
      let tweetMessage = randomArray(tweets);
      // check to make sure the tweet hasn't already been used
      if (used.includes(tweetMessage)) {
        tweetMessage = randomArray(tweets);
      }else {
        // push recent message to used array
        used.push(tweetMessage);
        // update used JSON file to keep track of used Tweet messages
        fs.writeFile('./used.json', JSON.stringify(used), function (err) {
          if (err) throw err;
        });
      }
      // post twitter message
      Twitter.post('statuses/update', { status: tweetMessage }, function(err, data, response) {
        console.log(`Posted Tweet: ${tweetMessage}`);
      });
    });
  });
}

// post a tweet as soon as program is running
post();
// retweet in every 11 hours
setInterval(post, 39600000);

// RETWEET BOT ==================================================

// find latest tweet according the query 'q' in params
const retweet = function() {
  const params = {
      q: randomArray(hashtags),  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
      if (!err) {
        // grab ID of tweet to retweet
          const retweetId = data.statuses[0].id_str;
          // Tell TWITTER to retweet
          Twitter.post('statuses/retweet/:id', {
              id: retweetId
          }, function(err, response) {
              if (response) {
                  console.log('Retweeted!');
              }
              // if there was an error while tweeting
              if (err) {
                  console.log('Something went wrong while RETWEETING... Duplication maybe...');
              }
          });
      }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...');
      }
  });
}

// retweet as soon as program is running
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);


// FAVORITE BOT ==================================================

// find a random tweet and 'favorite' it
const favoriteTweet = function(){
  const params = {
      q: randomArray(hashtags),  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }

  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    const tweet = data.statuses;
    // pick a random tweet
    const randomTweet = ranDom(tweet);   

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('Cannont retweet... Error');
        }
        else{
          console.log('Favorited!');
        }
      });
    }
  });
}
// favorite a tweet as soon as program is running
favoriteTweet();
// 'favorite' a tweet in every 13 minutes
setInterval(favoriteTweet, 780000);

// function to generate a random tweet
function ranDom (arr) {
  const index = Math.floor(Math.random()*arr.length);
  return arr[index];
};