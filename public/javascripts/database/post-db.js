let log = require('../helpers/logger');
let format = require('../helpers/format-date');
let SmPost = require('../models/sm-post-model');

const logger = 'POST DB';

let postController = {};

postController.getNextPost = (req, res) => {

    options = {
        timesUsedToday:1,
        smDate:-1
    };

    SmPost.findOne({}).sort(options).exec((err, post) => {
        if (err) {
            log.fat('Could not get next post: '+err, logger);
            throw err
        }

        if(post !== null){
            log.inf('** Next post - ID: '+post.smId+
                ' - Date: '+post.smDate+
                ' - Username: '+post.smUserName+
                ' - Times used: '+post.timesUsedToday+' **', logger);

            postController.updateUsedPost(post._id);
            let fmtPost = format.twitterDate(post);
            res.json(fmtPost);
        }else{
            log.err('Next post is NULL.', logger);
        }
    });
};

postController.updateUsedPost = (objId) => {
    let timesUsed = 0;
    SmPost.findOne({_id: objId}, (err, post) => {
        if (err) {
            log.err('Could not get post by id '+objId+". "+err, logger);
        }
        timesUsed = post.timesUsedToday + 1;
        SmPost.update({_id: objId}, {timesUsedToday: timesUsed}, {upsert: true}, (err) => {
            if (err) {log.err('Could not update \'timesUsedToday\' field.\n' + err, logger);}
        });
    });
};

postController.addSocialMediaPost = (post) => {

};

postController.addSocialMediaPosts = (posts) => {
    log.inf('No. of Tweets to exist check ' + posts.length + '.', logger);

    let filteredPosts = [];
    for (let i = 0; posts.length > i; i++) {
        filteredPosts.push(checkExists(posts[i]));
    }

    Promise.all(filteredPosts).then((data) => {
        log.inf('Check complete.', logger);
        let added = 0;
        let notAdded = 0;
        for (let i = 0; data.length > i; i++) {
            if (data[i] === true || data[i] === null) {
                notAdded++;
            } else {
                let newPost = new SmPost(data[i]);
                newPost.save(newPost, (err) => {
                    if (err) {log.err(err, logger)}
                });
                added++;
            }
        }
        log.inf('POSTS: New \''+added+'\' - Already Exists \''+notAdded+'\'', logger);
    }).catch((err) => {
        log.err('Promise encountered an error. ' + err, logger);
    });
};

function checkExists(post) {
    return new Promise((resolve, reject) => {
        SmPost.find({smId: post.smId}, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result.length) {
                resolve(true);
            } else {
                resolve(post);
            }
        });
    });
}
module.exports = postController;