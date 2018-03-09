var format = require('../helpers/format-date');
var SmPost = require('../models/sm-post-model');
var slideController = {};

slideController.getNextPost = (req, res) => {

    options = {
        timesUsedToday:1,
        smDate:1
    }

    SmPost.findOne({}).sort(options).exec((err, post) => {
        if (err) {
            throw err
        }
        slideController.updateUsedPost(post._id);

        var fmtDate = format.twitterDate(post.smDate);
        post.smDate = fmtDate;

        console.log('NEW DATE: '+fmtDate);
        console.log('Next post: '+post)
        res.json(post);
    });
};

slideController.updateUsedPost = (objId) => {
    var timesUsed = 0;

    SmPost.findOne({_id: objId}, (err, post) => {
        if (err) {
            throw new Error('ERROR: Could not get post by ID \'' + objId + '\'.');
        }
        console.log('Post: ' + post);
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
    console.log('Number of posts to check ' + posts.length + '.');

    let filteredPosts = [];

    for (let i = 0; posts.length > i; i++) {
        filteredPosts.push(checkExists(posts[i]));
    }

    Promise.all(filteredPosts).then((data) => {

        console.log('Number of promises: ' + data.length);
        for (let i = 0; data.length > i; i++) {

            if (data[i] === true || data === null) {
                console.log('Not adding.');
            } else {
                console.log('Adding.');
                let newPost = new SmPost(data[i]);
                newPost.save(newPost, (err) => {
                    if (err) {
                        console.log('ERROR: ' + err + '.')
                    }
                });
                console.log('Success.');
            }
        }
    }).catch((err) => {
        console.log('ERROR: Promise encountered an error: ' + err);
    });
};

function checkExists(post) {
    return new Promise((resolve, reject) => {
        console.log('Checking if ' + post.smId + ' exists...');
        SmPost.find({smId: post.smId}, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result.length) {
                console.log('Post: '+post.smId+' exists.');
                resolve(true);
            } else {
                console.log('Post: '+post.smId+' does not exist.');
                resolve(post);
            }
        });
    });
}

module.exports = slideController;