var settings = require('../../../database/settings-controller');
var convert = require('../../../helpers/tweet-model-mapper');
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

        let nullFilteredTweets = [];

        for (let i = 0; i < filteredTweets.length; i++) {
            if(filteredTweets[i] !== null){
                nullFilteredTweets.push(filteredTweets[i]);
            }
        }

        console.log('Total filtered tweets: '+nullFilteredTweets.length);

        db.addSocialMediaPosts(nullFilteredTweets);

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
            count: conf.twitter.count,
            geocode: conf.twitter.geocode,
            tweet_mode: conf.twitter.tweet_mode
        }, (err, data, res) => {

            console.log('DATA: '+res.body);

            if (err) {
                reject(err);
            }

            console.log('No. of Tweets for query \'' + query.word+'\' = '+ data.statuses.length);

            if(data.statuses === 'undefined' || data.statuses === null || data.statuses.length === 0){
                resolve(data.statuses);
            }else {
                resolve(convert.convertToTwitterModel(data.statuses, query.word));
            }
        });
    });
}

function checkBlacklist(tweet) {
    return new Promise((resolve, reject) => {

        settings.getBlacklist().then((bList) => {
            let rejectTweet = false;

            for (let i = 0; i < bList.length; i++) {

                regPatt = new RegExp(bList[i].word, 'ig');

                if (regPatt.test(tweet.smContent)) {
                    console.log('Not adding post containing \''+bList[i].word+'\' in full_text \''+tweet.smContent+'\'');
                    rejectTweet = true;
                    break;
                }else if (regPatt.test(tweet.smUserName)) {
                    console.log('Not adding post containing \''+bList[i].word+'\' in username \''+tweet.smUserName+'\'');
                    rejectTweet = true;
                    break;
                }
            }

            if(rejectTweet){
                resolve(null);
            }else{
                resolve(tweet);
            }
        });
    });
}

module.exports = api;