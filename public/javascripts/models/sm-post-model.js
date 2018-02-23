var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var smPost = new Schema({
    postId: Number,
    listPriority: Number,
    name: String,
    userName: String,
    postContent: String,
    postDate: String,
    postProfileImgUrl: String,
    postImgUrl: String,
    smPlatform: {
        type: String,
        enum: ['Facebook', 'Instagram', 'Twitter']
    }
});

module.exports = mongoose.model('SmPostModel', smPost);