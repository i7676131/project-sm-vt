var conf = require('../../../config/system-config');
var AppSetting = require('../models/settings-model');
var timeConverter = require('../helpers/milliseconds');
const settingObjId = conf.settings.settingDocObjectId;

// Set default interval in-case of error.
var apiRefresh = 900000;

// Update list once when app starts.
updatePostList();
getApiRefresh();

function getApiRefresh() {
    AppSetting.find({_id: settingObjId}).exec((err, setting) => {
        if (err) {
            console.log('ERROR: Could not get API Refresh.');
            process.exit(0);
        }
        apiRefresh = timeConverter.minsToMills(setting[0].apiRefresh);
        console.log('API refresh set to \'' + apiRefresh + '\' (milliseconds)');
        setInterval(updatePostList, apiRefresh);
    });
}

function updatePostList() {
    // TODO: Call platform APIs from this function.
    console.log('Updating social media post list...');
}
