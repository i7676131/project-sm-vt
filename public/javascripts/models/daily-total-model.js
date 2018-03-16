let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dailyTotalSchema = new Schema({
    day: String,
    dayTotal: {
        type: Number,
        default: 0
    },
    statDate: {
        type: Date,
        default: Date.now()
    }
});

let DailyTotal = mongoose.model('DailyTotalPosts', dailyTotalSchema);
module.exports = DailyTotal;