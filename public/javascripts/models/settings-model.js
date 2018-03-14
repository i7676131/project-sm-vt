var conf = require('../../../config/system-config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let settingSchema = new Schema({
    whitelist: [{
        word: String,
        geocode: {
            type: String,
            default: conf.twitter.geocode
        }
    }],
    blacklist: [{
        word: String
    }],
    updateRefresh: {type: Number, default: 15, min: 15},
    slideSpeed: {type: Number, default: 10, min: 10},
    disablePlatform: String
});

let Settings = mongoose.model('settings', settingSchema);
module.exports = Settings;