var settings = require('../../../database/settings-db');
var log = require('../../../helpers/logger');
var convert = require('../../../helpers/tweet-model-mapper');
var db = require('../../../database/post-db');
var Twitter = require('twitter');
var conf = require('../../../../../config/system-config');
var client = new Twitter({
    consumer_key: conf.twitter.consumer_key,
    consumer_secret: conf.twitter.consumer_secret,
    bearer_token: conf.twitter.bearer_token
});
const logger = 'TWITTER API';
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
        log.inf('Total tweets: ' + singleArrayOfTweets.length, logger);
        for (let i = 0; i < singleArrayOfTweets.length; i++) {
            filteredTweets.push(settings.checkBlacklist(singleArrayOfTweets[i]));
        }
        return Promise.all(filteredTweets);

    }).then((filteredTweets) => {

        let nullFilteredTweets = [];
        for (let i = 0; i < filteredTweets.length; i++) {
            if(filteredTweets[i] !== null){
                nullFilteredTweets.push(filteredTweets[i]);
            }
        }

        log.inf('Total filtered tweets: '+nullFilteredTweets.length, logger);
        db.addSocialMediaPosts(nullFilteredTweets);

    }).catch((reject) => {
        log.err(reject, logger);
    });
};

api.getSingleNewPost = (query) => {

    getTweets(query).then((tweets) => {

        nullFilteredTweets = nullFilter(tweets);

        log.inf('Total filtered tweets: '+nullFilteredTweets.length, logger);
        db.addSocialMediaPosts(nullFilteredTweets);

    }).catch((err) => {
        log.err(err);
    });

};

function nullFilter(tweets){
    let nullFilteredTweets = [];
    for (let i = 0; i < tweets.length; i++) {
        if(tweets[i] !== null){
            nullFilteredTweets.push(tweets[i]);
        }
    }
    return nullFilteredTweets;
}

function getTweets(query) {
    return new Promise((resolve, reject) => {
        client.get('search/tweets', {
            q: query.word,
            lang: conf.twitter.lang,
            result_type: conf.twitter.result_type,
            count: conf.twitter.count,
            geocode: query.geocode,
            tweet_mode: conf.twitter.tweet_mode
        }, (err, data, res) => {

            if(data.errors != null){
                if(data.errors[0].code === 89){
                    log.err('Received error from Twitter. Code: '+data.errors[0].code+' Error: '+data.errors[0].message, logger);
                    throw Error(data.errors[0].message);
                }else if(data.errors[0].code === 88){
                    log.err('Received error from Twitter: code '+data.errors[0].code, logger);
                    throw Error(data.errors[0].message);
                }
            }

            if (err) {reject(err);}

            log.inf('No. of Tweets for query \'' + query.word+' - '+query.geocode+'\' = '+ data.statuses.length, logger);

            if(data.statuses === 'undefined' || data.statuses === null || data.statuses.length === 0){
                resolve(data.statuses);
            }else {
                resolve(convert.convertToTwitterModel(data.statuses, query.word));
            }
        });
    });
}

module.exports = api;