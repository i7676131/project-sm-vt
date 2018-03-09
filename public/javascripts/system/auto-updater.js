var conf = require('../../../config/system-config');
var AppSetting = require('../models/settings-model');
var timeConverter = require('../helpers/milliseconds');
var Statistics = require('../database/stats-controller');
var Twitter = require('../apis/platforms/twitter/twitter-api');
const settingObjId = conf.settings.settingDocObjectId;

// Set default interval in-case of error.
var apiRefresh = 900000;

// Update list once when app starts.
updateAppData();
getUpdateRefresh();

function getUpdateRefresh() {
    AppSetting.find({_id: settingObjId}).exec((err, setting) => {
        if (err) {
            console.log('ERROR: Could not get API Refresh.');
            process.exit(0);
        }
        updateRefresh = timeConverter.minsToMills(setting[0].updateRefresh);
        console.log('API refresh set to \'' + updateRefresh + '\' (milliseconds)');
        setInterval(updateAppData, updateRefresh);
    });
};

function updateAppData() {

    console.log('Updating social media post list...');
    Twitter.getNewPosts();

    console.log('Updating app statistics...');
    Statistics.updateStats();

};
