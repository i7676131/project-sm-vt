let week = require('../helpers/format-date');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let word = {
    query: String,
    total: {
        type: Number,
        default: 0
    }
};

let weeklyPosts = new Schema({
    weekOfYear: {
        type: Number,
        default: week.getWeek()
    },
    words: [word]
});

let WeeklyPosts = mongoose.model('weeklyposts', weeklyPosts);
module.exports = WeeklyPosts;