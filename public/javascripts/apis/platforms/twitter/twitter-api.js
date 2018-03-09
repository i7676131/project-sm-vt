var twitter = require('twitter');
var conf = require('../../../../../config/system-config');
var client = {
    consumer_key: conf.twitter.consumer_key,
    consumer_secret: conf.twitter.consumer_secret,
    bearer_token: conf.twitter.bearer_token
};

var api = {};

api.getNewPosts = () => {
    client.get('search/tweets', {q: 'node.js'}, (err, tweets, res) => {
        console.log('TWEETS: '+tweets);
    });
};

module.exports = api;