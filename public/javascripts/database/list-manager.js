var SmPost = require('../models/sm-post-model');
var listManager = {};

listManager.getNextPost = () => {

};

listManager.updateUsedPost = (objId) => {
    var timesUsed = 0;

    SmPost.findOne({_id: objId}, (err, post) => {
        if(err) {
            throw new Error('ERROR: Could not get post by ID \''+objId+'\'.');
        }
        console.log('Post: '+post);
        timesUsed = post.timesUsedToday + 1;
        console.log('Times used today was '+post.timesUsedToday+' now '+timesUsed+'.');
        SmPost.update({_id: objId}, {timesUsedToday: timesUsed}, {upsert: true}, (err) => {
            if(err) {
                throw new Error('ERROR: Could not update \'timesUsedToday\' field.\n' + err);
            }
        });
    });
};
listManager.addSocialMediaPost = (posts) => {
    console.log('Number of posts to add '+posts.length+'.')
    for(let i = 0; posts.length > i; i++){
        console.log('Adding post index '+i+'.');
        let newPost = new SmPost(posts[i]);
        newPost.save(newPost, (err) => {
            if(err){
                console.log('ERROR: Could not add new post '+i+'.')
            }
        });
        console.log('Success!')
    }
};

module.exports = listManager;