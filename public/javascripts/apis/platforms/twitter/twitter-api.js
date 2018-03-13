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

        let filteredTweets = [];

        console.log('Total tweets: ' + singleArrayOfTweets.length);
        for (let i = 0; i < singleArrayOfTweets.length; i++) {
            filteredTweets.push(checkBlacklist(singleArrayOfTweets[i]));
        }

        return Promise.all(filteredTweets);

    }).then((filteredTweets) => {

        for (let i = 0; i < filteredTweets.length; i++) {
            console.log('Filtered: '+filteredTweets[i].text);
        }

        console.log('Total filtered tweets: '+filteredTweets.length);
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

function checkBlacklist(tweet) {
    return new Promise((resolve, reject) => {

        settings.getBlacklist().then((bList) => {
            for (let i = 0; i < bList.length; i++) {

                //if (tweet.text.replace(/\s/g, '').includes(bList[i].word.replace(/\s/g, ''))) {
                if (tweet.text.match(new RegExp(bList, 'ig'))) {
                //if (tweet.text.match()) {
                    console.log('Not adding post: ' + tweet.text);
                } else {
                    resolve(tweet);
                }
            }
        });
    });
}

module.exports = api;