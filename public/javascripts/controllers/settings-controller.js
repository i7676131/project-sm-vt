var conf = require('../../../config/system-config');
var AppSetting = require('../models/settings-model');
const settingObjId = conf.settings.settingDocObjectId;

var settingsController = {};

settingsController.getSettings = (req, res) => {
    let message = req.query.message;

    AppSetting.find({}).exec((err, setting) => {
        console.log('DB response:\n' + setting);
        if (err) {
            res.render('../views/settings.pug', {
                message: err,
            });
        } else {
            res.render('../views/settings.pug', {
                title: 'Settings',
                appSett: setting,
                message: message,
            });
        }
    });
};
settingsController.addListItem = (req, res) => {
    let newWord = {word: req.body.listWord};
    let success = encodeURIComponent('Added successfully.');
    AppSetting.update({_id: settingObjId}, {$push: {[req.body.listType]: newWord}}, (err) => {
        if (err) {
            let failure = encodeURIComponent(err);
            res.redirect('/settings?message=' + failure);
        } else {
            res.redirect('/settings?message=' + success);
        }
    });
};
settingsController.update = (req, res) => {
    let apiRefresh = req.body.formApiRefresh;
    let slideSpeed = req.body.formSlideSpeed;
    let message = '';
    let disPlatform = {
        disTwitter: req.body.formDisTwitter,
        disFacebook: req.body.formDisFacebook,
        disInstagram: req.body.formDisInstagram
    };

    if (apiRefresh !== '') {
        updateSetting('apiRefresh', apiRefresh);
    }
    if (slideSpeed !== '') {
        updateSetting('slideSpeed', slideSpeed);
    }
    updateSetting('disablePlatform', disPlatform)

    res.redirect('/settings?message=' + message);
};
settingsController.delete = (req, res) => {
    let sucecss = encodeURIComponent('Deleted successfully.')
    let listType = req.body.listType;
    let wordId;

    if (listType == 'blacklist') {
        wordId = req.body.blacklistSelect;
    } else if (listType == 'whitelist') {
        wordId = req.body.whitelistSelect;
    } else {
        throw new Error('ERROR: listType is unknown.')
    }

    AppSetting.update({_id: settingObjId}, {$pull: {[listType]: {_id: wordId}}}, (err) => {
        if (err) {
            let failure = encodeURIComponent(err);
            res.redirect('/settings?message=' + failure);
        } else {
            res.redirect('/settings?message=' + sucecss);
        }
    });
};

function updateSetting(field, newValue) {
    let returnMsg;

    AppSetting.update({_id: settingObjId}, {[field]: newValue}, {upsert: true}, (err) => {
        if (err) {
            returnMsg = encodeURIComponent(err);
        } else {
            returnMsg = encodeURIComponent(field + ' updated successfully. ');
        }
    });
    console.log('UPDATE FUNCTION: ' + returnMsg);
    return returnMsg;
};

module.exports = settingsController;