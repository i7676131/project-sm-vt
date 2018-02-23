var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var smPost = new Schema('smPost', {
    postId:{Type: Number, Min: 1, Required: true},
    listPriority:{Type: Number, Min: 1, Required: true},
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

var SmPostModel = mongoose.model('SmPostModel', smPost);