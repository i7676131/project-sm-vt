var mongoose = require('mongoose');
var AppSetting = require('../models/settings-model');
mongoose.model('settings');

var settingsController = {};

settingsController.getSettings = (req, res) => {
    AppSetting.find({}, (err, setting) => {
        console.log('DB response:\n'+setting);

        if(err){
            throw err;
        }else{
            res.render('../views/settings.pug', {
                title: 'Settings',
                appSett: setting
            });
        }
    });
};

settingsController.addWhiteListItem = (req, res) => {
    let newWord = {wListId:4, word:'Amy'};

    // add whitelist word to Array in the settings document in MondoDb.
    AppSetting.findOneAndUpdate({instance:'1'},{$push: {whitelist:newWord}}, (err) => {
       if(err){
           console.log(err);
           throw err
       }else{
           console.log('New whitelist word: '+newWord.word+' was added successfully.');
           res.redirect('/settings')
       }
    });
};

settingsController.addBlackListItem = (req, res) => {

};

module.exports = settingsController;