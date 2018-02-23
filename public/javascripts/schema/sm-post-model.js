var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var smPost = new Schema('smPost', {
    name: String,
    userName: String,
    postContent: String,
    postDate: String,
    postProfileImgUrl: String,
    postImgUrl: String,
    smPlatform: String
});