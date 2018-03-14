var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    smId: String,
    smName: String,
    smUserName: String,
    smContent: String,
    smDate: {
        type: Date,
        default: Date.now()
    },
    smAvatarUrl: {
        type: String,
        default: '/images/logos/twitter-logo.png' //TODO add default profile pic.
    },
    smImageUrl: {
        type: String,
        default: '/images/default-image.png' //TODO add default background image, in case there is no SM image.
    },
    smPlatform: String,
    keywordUsed: String,
    timesUsedToday: {
        type: Number,
        default: 0,
        required: true
    },
    postExpiry: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 1000*60*60*24*7);
        }
    }
});

var Post = mongoose.model('posts', postSchema);
module.exports = Post;