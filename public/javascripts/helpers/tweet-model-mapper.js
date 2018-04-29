var SmPost = require('../models/sm-post-model');

module.exports = {

    convertToTwitterModel: function(tweets, word){
        let modelTweets = [];
        for(let i = 0; i < tweets.length; i++){

            let tweet = tweets[i];
            let image;
            if('media' in tweet.entities){
                image = tweet.entities.media[0].media_url;
            }

            let post = new SmPost({
                smId: tweet.id,
                smName: tweet.user.name,
                smUserName: '@'+tweet.user.screen_name,
                smContent: tweet.full_text
                    .replace(/&amp;/g,'&')
                    .replace(/&gt;/g,'>')
                    .replace(/&lt;/g,'<')
                    .replace(/(?:https|http):\/\/[\n\S]+/g, ''),
                smDate: tweet.created_at,
                smAvatarUrl: tweet.user.profile_image_url,
                smImageUrl: image,
                smPlatform: '/images/logos/twitter-logo.png',
                keywordUsed: word
            });

            modelTweets.push(post);
        }
        return modelTweets;
    }
};