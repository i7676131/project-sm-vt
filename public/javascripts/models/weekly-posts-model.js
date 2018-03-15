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
    weekCommencing: {
        type: Number,
        default: week.getWeek()
    },
    words: [word]
});

let WeeklyPosts = mongoose.model('WeeklyPosts', weeklyPosts);
module.exports = WeeklyPosts;