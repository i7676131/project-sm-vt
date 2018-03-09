var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const logoUrl = '/images/logos/';

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
        default: 'some/url' //TODO add default profile pic.
    },
    smImageUrl: {
        type: String,
        default: 'some/url' //TODO add default background image, in case there is no SM image.
    },
    smPlatform: String,
    timesUsedToday: {
        type: Number,
        default: 0,
        required: true
    }
});

var Post = mongoose.model('posts', postSchema);
module.exports = Post;