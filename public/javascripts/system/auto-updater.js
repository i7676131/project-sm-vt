var conf = require('../../../config/system-config');
var AppSetting = require('../models/settings-model');
var timeConverter = require('../helpers/milliseconds');
var Statistics = require('../database/statistics-db');
var Twitter = require('../apis/platforms/twitter/twitter-api');
var log = require('../helpers/logger');
const settingObjId = conf.settings.settingDocObjectId;
const logger = 'AUTO UPDATER';

// Set default interval in-case of error.
var updateRefresh = 900000;

// Update list once when app starts.
updateAppData();
getUpdateRefresh();

function getUpdateRefresh() {
    AppSetting.find({_id: settingObjId}).exec((err, setting) => {
        if (err) {
            log.fat('ERROR: Could not get API Refresh.', logger);
            process.exit(0);
        }
        updateRefresh = timeConverter.minsToMills(setting[0].updateRefresh);
        log.inf('API refresh set to \'' + updateRefresh + '\' (milliseconds)', logger);
        setInterval(updateAppData, updateRefresh);
    });
};

function updateAppData() {

    log.inf('Updating social media post list...', logger);
    Twitter.getNewPosts();

};
