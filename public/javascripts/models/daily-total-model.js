let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dailyTotal = new Schema({
    day: String,
    dayTotal: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

let DailyTotal = mongoose.model('DailyTotalPosts', dailyTotal);
module.exports = DailyTotal;