let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let weeklyPosts = new Schema({
    weekCommencing: String,
    total: {
        type: Number,
        default: 0
    }
});

let WeeklyPosts = mongoose.model('WeeklyPosts', weeklyPosts);
module.exports = WeeklyPosts;