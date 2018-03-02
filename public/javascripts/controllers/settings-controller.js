var mongoose = require('mongoose');
var AppSetting = require('../models/settings-model');
mongoose.model('settings');

var settingsController = {};

settingsController.getSettings = (req, res) => {

    let message = req.query.message;
    let success = req.query.success;
    console.log('Message: '+message);

    AppSetting.find({}).exec((err, setting) => {
        console.log('DB response:\n'+setting);

        if(err){
            throw err;
        }else{
            res.render('../views/settings.pug', {
                title: 'Settings',
                appSett: setting,
                message: message,
            });
        }
    });
};

settingsController.addListItem = (req, res) => {
    let message;
    let listType = req.body.listType;
    let newWord = {word: req.body.listWord};

    if(listType == 'whitelist'){
        message = encodeURIComponent(addWord(listType, newWord));
        console.log('MESSAGE: '+message)
        res.redirect('/settings?message='+message);
    }else if(listType == 'blacklist'){
        message = encodeURIComponent(addWord(listType, newWord));
        res.redirect('/settings?message='+message);
    };
};

function addWord (list, newWord) {
    AppSetting.findOneAndUpdate(
        {instance:'1'},
        {$push: { [list] :newWord}},
        (err) => {
            if(err){
                throw err;
            }
            console.log('New '+list+' word \''+newWord.word+'\' was added successfully...');
    });
    return 'New '+list+' word \''+newWord.word+'\' was added successfully...';
}

settingsController.delete = (req, res) => {
    const id = req.body.blacklistSelect;

    AppSetting.update(
        {_id: '5a985a4917fd01299334e96c'},
        {$pull: {blacklist: {_id:id}}},
        (err) => {
            if(err){
                throw err
            }else {
                let message = encodeURIComponent(req.body.blacklistSelect+' has been deleted');
                res.redirect('/settings?message='+message);
            }
        });
};


module.exports = settingsController;