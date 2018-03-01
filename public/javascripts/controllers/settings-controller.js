let mongoose = require('mongoose');
let AppSetting = mongoose.model('settings');

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
    let newWord = new AppSetting(req.body);

    // add whitelist word to Array in the settings document in MondoDb.
    newWord.save((err) => {
       if(err){
           console.log(err);
           throw err
       }else{
           console.log('New whitelist word was added successfully.');
           res.redirect('/settings')
       }
    });
};

settingsController.addBlackListItem = (req, res) => {

};

module.exports = settingsController;