var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let settingSchema = new Schema({
    whitelist: [{word: String}],
    blacklist: [{word: String}],
    apiRefresh: {type: Number, default: 15, min: 15},
    slideSpeed: {type: Number, default: 10, min: 10},
    disablePlatform: {
        disTwitter: {type: Boolean, default: false},
        disFacebook: {type: Boolean, default: false},
        disInstagram: {type: Boolean, default: false}
    }
});

let Settings = mongoose.model('settings', settingSchema);
module.exports = Settings;