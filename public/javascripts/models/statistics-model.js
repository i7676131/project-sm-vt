let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let popularWordsSchema = new Schema({
    word: String,
    total: {
        type: Number,
        default: 0
    }
});

let dailyTotal = new Schema({
    day: String,
    total: {
        type: Number,
        default: 0
    }
});

let PopularWords = mongoose.model('TotalPosts', popularWordsSchema);
module.exports = PopularWords;

let WeeklyTotal = mongoose.model('WeeklyPosts', weeklyTotal);
module.exports = WeeklyTotal;