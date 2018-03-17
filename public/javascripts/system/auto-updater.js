let conf = require('../../../config/system-config');
let AppSetting = require('../models/settings-model');
let Stats = require('../database/statistics-db');
let timeConverter = require('../helpers/milliseconds');
let Twitter = require('../apis/platforms/twitter/twitter-api');
let log = require('../helpers/logger');
const settingObjId = conf.settings.settingDocObjectId;
const logger = 'AUTO UPDATER';

// Set default interval in-case of error.
let updateRefresh = 900000;

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
}

function updateAppData() {
    log.inf('Updating social media post list...', logger);
    Twitter.getNewPosts();
    log.inf('Updating daily total statistics...', logger);
    Stats.updateDailyTotal();
    log.inf('Updating popular posts of the week...', logger);
    Stats.updateWeeklyPosts();
}
