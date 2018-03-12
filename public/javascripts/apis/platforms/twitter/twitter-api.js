var settings = require('../../../database/settings-controller');
var db = require('../../../database/slide-controller');
var Twitter = require('twitter');
var conf = require('../../../../../config/system-config');
var client = new Twitter({
    consumer_key: conf.twitter.consumer_key,
    consumer_secret: conf.twitter.consumer_secret,
    bearer_token: conf.twitter.bearer_token
});

var api = {};

api.getNewPosts = () => {

    settings.getWhitelist().then((wList) => {

        let allTweets = [];
        for (let i = 0; i < wList.length; i++) {
            allTweets.push(getTweets(wList[i]));
        }
        return Promise.all(allTweets);

    }).then((doubleArrayOfTweets) => {

        let singleArrayOfTweets = [];
        // Turn into single dimension array of tweets.
        for (let i = 0; i < doubleArrayOfTweets.length; i++) {
            for (let x = 0; x < doubleArrayOfTweets[i].length; x++) {
                singleArrayOfTweets.push(doubleArrayOfTweets[i][x]);
            }
        }

        console.log('Total tweets: ' + singleArrayOfTweets.length);
        /*for (let x = 0; x < singleArrayOfTweets.length; x++) {
            console.log('TWEET: '+singleArrayOfTweets[x].id+' - '+ singleArrayOfTweets[x].text);
        }*/

        checkBlacklist(singleArrayOfTweets);

    }).catch((reject) => {
        console.log('Error: ' + reject)
    });
};

function getTweets(query) {
    return new Promise((resolve, reject) => {
        client.get('search/tweets', {
            q: query.word,
            lang: conf.twitter.lang,
            result_type: conf.twitter.result_type,
            count: conf.twitter.count
        }, (err, data, res) => {
            if (err) {
                reject(err);
            }
            console.log('Number of Tweets: ' + data.statuses.length + ' for query: ' + query);
            resolve(data.statuses);
        });
    });
}

function checkBlacklist(tweets) {
    return new Promise((resolve, reject) => {

        let filteredTweets = [];

        settings.getBlacklist().then((bList) => {

           console.log('Blacklist: '+bList);

           for(let i = 0; i < bList.length; i++){
               for(let x = 0; x < tweets.length; x++){

                   if(tweets[x].text.replace(/\s/g, '').includes(bList[i].word.replace())){
                       console.log('Not adding post: '+tweets[x].text);
                   }else{
                       filteredTweets.push(tweets[x]);
                   }

               }

           }



        });



    });
}

module.exports = api;