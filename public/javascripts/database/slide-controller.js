var format = require('../helpers/format-date');
var SmPost = require('../models/sm-post-model');
var slideController = {};

slideController.getNextPost = (req, res) => {

    options = {
        timesUsedToday:1,
        smDate:-1
    }

    SmPost.findOne({}).sort(options).exec((err, post) => {
        if (err) {
            throw err
        }
        console.log('Next post - Date: '+post.smDate+' Times used: '+post.timesUsedToday);

        slideController.updateUsedPost(post._id);
        var fmtPost = format.twitterDate(post);
        res.json(fmtPost);
    });
};

slideController.updateUsedPost = (objId) => {
    let timesUsed = 0;
    SmPost.findOne({_id: objId}, (err, post) => {
        if (err) {
            throw new Error('ERROR: Could not get post by ID \'' + objId + '\'.');
        }
        timesUsed = post.timesUsedToday + 1;
        console.log('Times used today was ' + post.timesUsedToday + ' now ' + timesUsed + '.');
        SmPost.update({_id: objId}, {timesUsedToday: timesUsed}, {upsert: true}, (err) => {
            if (err) {
                throw new Error('ERROR: Could not update \'timesUsedToday\' field.\n' + err);
            }
        });
    });
};

slideController.addSocialMediaPosts = (posts) => {
    console.log('No. of Tweets to check ' + posts.length + '.');

    let filteredPosts = [];
    for (let i = 0; posts.length > i; i++) {
        filteredPosts.push(checkExists(posts[i]));
    }

    Promise.all(filteredPosts).then((data) => {
        console.log('No. of Tweets to add: ' + data.length);
        let added = 0;
        let notAdded = 0;
        for (let i = 0; data.length > i; i++) {
            if (data[i] === true || data === null) {
                notAdded++;
            } else {
                let newPost = new SmPost(data[i]);
                newPost.save(newPost, (err) => {
                    if (err) {console.log('ERROR: ' + err + '.')}
                });
                added++;
            }
        }
        console.log('Total added: '+added+' - Total not added: '+notAdded);
    }).catch((err) => {
        console.log('ERROR: Promise encountered an error: ' + err);
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
module.exports = slideController;