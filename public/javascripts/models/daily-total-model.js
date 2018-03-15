let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dailyTotal = new Schema({
    day: String,
    total: {
        type: Number,
        default: 0
    }
});

let DailyTotal = mongoose.model('DailyTotalPosts', dailyTotal);
module.exports = DailyTotal;