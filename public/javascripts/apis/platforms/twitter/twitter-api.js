var twitter = require('twitter');
var conf = require('../../../../../config/system-config');
var client = new twitter({
    consumer_key: conf.twitter.consumer_key,
    consumer_secret: conf.twitter.consumer_secret,
    bearer_token: conf.twitter.bearer_token
});

var api = {};

api.getNewPosts = () => {
    client.get('search/tweets',
        {
            q: 'from:mr_rone_',
            lang: 'en',
            result_type: 'recent'
        }, (err, tweets, res) => {
        console.log('Response: '+res.body);

        console.log('Length: '+tweets.statuses.length);

        for(let i = 0; i < tweets.statuses.length; i++){
            console.log('Tweet: '+tweets.statuses[i].id+' - Username: '+tweets.statuses[i].user.name+' - Text: '+tweets.statuses[i].text);
        }
    });
};

module.exports = api;