let fmtDate = require('../helpers/format-date');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
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
        default: '/images/logos/twitter-logo.png'
    },
    smImageUrl: {
        type: String,
        default: '/images/default-image.png'
    },
    smPlatform: String,
    keywordUsed: String,
    timesUsedToday: {
        type: Number,
        default: 0,
        required: true
    },
    weekOfYearAdded: {
        type: Number,
        default: fmtDate.getWeek(Date.now())
    },
    dayAdded: {
        type: Number,
        default: fmtDate.getDay(Date.now())
    },
    postExpiry: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 1000*60*60*24*7);
        }
    }
});

let Post = mongoose.model('posts', postSchema);
module.exports = Post;