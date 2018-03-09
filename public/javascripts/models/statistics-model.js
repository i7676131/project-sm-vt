let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let keywordSchema = new Schema({
    word: String,
    total: {
        type: Number,
        default: 0
    }
});

let statSchema = new Schema({
    statPlatform: String,
    statWeeklyPostTotal: Number,
    statPopularKeywords: {
        keyword: [keywordSchema]
    }
});

let Statistics = mongoose.model('statistics', statSchema);
module.exports = Statistics;