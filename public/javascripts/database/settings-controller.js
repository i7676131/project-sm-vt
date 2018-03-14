var conf = require('../../../config/system-config');
var log = require('../helpers/logger');
var AppSetting = require('../models/settings-model');
const settingObjId = conf.settings.settingDocObjectId;
const logger = 'SETTINGS CTRL';

var settingsController = {};

settingsController.getSettings = (req, res) => {
    let message = req.query.message;

    AppSetting.find({}).exec((err, setting) => {
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

settingsController.getWhitelist = () => {
    return new Promise((resolve, reject) => {
        AppSetting.findOne({_id: settingObjId}, (err, settings) => {
            if(err){
                log.err(err, logger);
                reject(err)
            }
            resolve(settings.whitelist);
        });
    });
};

settingsController.getBlacklist = () => {
    return new Promise((resolve, reject) => {
        AppSetting.findOne({_id: settingObjId}, (err, settings) => {
            if(err){
                log.err(err, logger);
                reject(err)
            }
            resolve(settings.blacklist);
        });
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
    let updateRefresh = req.body.formUpdateRefresh;
    let slideSpeed = req.body.formSlideSpeed;
    let message = 'Update successful.';
    /*let disPlatform = {
        disTwitter: req.body.formDisTwitter,
        disFacebook: req.body.formDisFacebook,
        disInstagram: req.body.formDisInstagram
    };*/

    if (updateRefresh !== '' && slideSpeed !== '') {
        updateSetting('updateRefresh', updateRefresh);
        updateSetting('slideSpeed', slideSpeed);
    }else if (updateRefresh !== '') {
        updateSetting('updateRefresh', updateRefresh);
    }else if (slideSpeed !== '') {
        updateSetting('slideSpeed', slideSpeed);
    }else{
        message = 'No updated detected.';
    }

    //updateSetting('disablePlatform', disPlatform);

    res.redirect('/settings?message=' + encodeURIComponent(message));
};

settingsController.delete = (req, res) => {
    let success = encodeURIComponent('Deleted successfully.');
    let listType = req.body.listType;
    let wordId;

    if (listType === 'blacklist') {
        wordId = req.body.blacklistSelect;
    } else if (listType === 'whitelist') {
        wordId = req.body.whitelistSelect;
    } else {
        log.err(listType+' is unknown.', logger);
    }

    AppSetting.update({_id: settingObjId}, {$pull: {[listType]: {_id: wordId}}}, (err) => {
        if (err) {
            let failure = encodeURIComponent(err);
            log.inf('Could not delete word \''+wordId+'\'.', logger);
            res.redirect('/settings?message=' + failure);
        } else {
            log.inf('Word \''+wordId+'\' deleted.', logger);
            res.redirect('/settings?message=' + success);
        }
    });
};

function updateSetting(field, newValue) {
    AppSetting.update({_id: settingObjId}, {[field]: newValue}, {upsert: true}, (err) => {
        if (err) {
            log.err(err, logger);
        } else {
            log.inf(field+' was updated successfully.', logger);
        }
    });
};

module.exports = settingsController;