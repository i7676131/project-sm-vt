let conf = require('../../../config/system-config');
let log = require('../helpers/logger');
let convert = require('../helpers/milliseconds');
let AppSetting = require('../models/settings-model');
let SmPost = require('../models/sm-post-model');

const settingObjId = conf.settings.settingDocObjectId;
const logger = 'SETTINGS DB';

let settingsController = {};

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

settingsController.getSlideSpeed = (req, res) => {
    AppSetting.findOne({_id: settingObjId}, (err, settings) => {
        if (err) {
            log.err(err, logger);
        }
        res.json(convert.secsToMills(settings.slideSpeed));
    });
};

settingsController.getWhitelist = () => {
    return new Promise((resolve, reject) => {
        AppSetting.findOne({_id: settingObjId}, (err, settings) => {
            if (err) {
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
            if (err) {
                log.err(err, logger);
                reject(err)
            }
            resolve(settings.blacklist);
        });
    });
};

settingsController.addListItem = (req, res) => {
    let formWord = req.body.listWord;
    let geoCode = req.body.geoCode;
    let list = req.body.listType;
    let newObj = '';

    log.inf('Adding new word \''+formWord+'\' to '+list,logger);

    // Check if geoCode has been entered by user or if undefined while adding blacklist word.
    if (geoCode !== '' && geoCode != null ) {
        newObj = {word: formWord, geocode: geoCode.replace(/\s/g, '')};
    } else {
        newObj = {word: formWord};
    }

    if (list === 'blacklist') {
        settingsController.checkBlacklistAndDelete(formWord);
    }


        let success = encodeURIComponent('Added successfully.');
    AppSetting.update({_id: settingObjId}, {$push: {[list]: newObj}}, (err) => {
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

    if (updateRefresh !== '' && slideSpeed !== '') {
        updateSetting('updateRefresh', updateRefresh);
        updateSetting('slideSpeed', slideSpeed);
    } else if (updateRefresh !== '') {
        updateSetting('updateRefresh', updateRefresh);
    } else if (slideSpeed !== '') {
        updateSetting('slideSpeed', slideSpeed);
    } else {
        message = 'No updated detected.';
    }

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
        log.err(listType + ' is unknown.', logger);
    }

    log.inf('Deleting word \''+wordId+'\' from '+listType,logger);

    AppSetting.update({_id: settingObjId}, {$pull: {[listType]: {_id: wordId}}}, (err) => {
        if (err) {
            let failure = encodeURIComponent(err);
            log.inf('Could not delete word \'' + wordId + '\'.', logger);
            res.redirect('/settings?message=' + failure);
        } else {
            log.inf('Word \'' + wordId + '\' deleted.', logger);
            res.redirect('/settings?message=' + success);
        }
    });
};

settingsController.checkBlacklist = (tweet) => {
    return new Promise((resolve) => {
        settingsController.getBlacklist().then((bList) => {
            let rejectTweet = false;
            for (let i = 0; i < bList.length; i++) {

                regPatt = new RegExp(bList[i].word, 'ig');

                if (regPatt.test(tweet.smContent)) {

                    log.war('Not adding post containing \''+bList[i].word+'\' in full_text \''+tweet.smContent+'\'', logger);
                    rejectTweet = true;
                    break;

                }else if (regPatt.test(tweet.smUserName)) {

                    log.war('Not adding post containing \''+bList[i].word+'\' in username \''+tweet.smUserName+'\'', logger);
                    rejectTweet = true;
                    break;
                }
            }
            if(rejectTweet){
                resolve(null);
            }else{
                resolve(tweet);
            }
        });
    });
};

settingsController.checkBlacklistAndDelete = (word) => {

    getAllPosts().then((docs) => {

        let removeDocs = checkDocs(docs, word);

        log.inf('Number of docs to remove: '+removeDocs.length, logger);
        for(let i = 0; i < removeDocs.length; i++){

            SmPost.findByIdAndRemove({_id: removeDocs[i]}, (err) => {

                if(err){log.err(err, logger);}
                log.inf('Removed: '+removeDocs[i], logger);

            });
        }
    });
};

function getAllPosts(){
    return new Promise((resolve, reject) => {
        SmPost.find({}, (err, docs) => {
            if(err){log.err(err); reject(err);}
            resolve(docs);
        });
    });
}

function checkDocs(docs, word){
    let removeDocs = [];

    for (let i = 0; i < docs.length; i++) {

        regPatt = new RegExp(word, 'ig');

        if (regPatt.test(docs[i].smContent)) {

            log.war('Post contains \''+word+'\' in full_text \''+docs[i].smContent+'\'', logger);
            removeDocs.push(docs[i]._id);

        }else if (regPatt.test(docs[i].smUserName)) {

            log.war('Post contains \''+word+'\' in username \''+docs[i].smUserName+'\'', logger);
            removeDocs.push(docs[i]._id);
        }
    }
    return removeDocs;
}


function updateSetting(field, newValue) {
    AppSetting.update({_id: settingObjId}, {[field]: newValue}, {upsert: true}, (err) => {
        if (err) {
            log.err(err, logger);
        } else {
            log.inf(field + ' was updated successfully.', logger);
        }
    });
}


module.exports = settingsController;