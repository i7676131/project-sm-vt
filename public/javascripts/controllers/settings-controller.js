var mongoose = require('mongoose');
var AppSetting = require('../models/settings-model');
mongoose.model('settings');

var settingsController = {};

settingsController.getSettings = (req, res) => {

    AppSetting.find({}).exec((err, setting) => {
        console.log('DB response:\n'+setting);

        if(err){
            throw err;
        }else{
            res.render('../views/settings.pug', {
                title: 'Settings',
                appSett: setting,
            });
        }
    });
};

settingsController.addListItem = (req, res) => {
    let listType = req.body.listType;
    console.log('List type from user: '+listType);

    let newWord = {word: req.body.listWord};

    if(listType == 'whitelist'){
        addWord(listType, newWord);
        // TODO set a parameter to true to indicate to user that adding word was a sucecss.
        res.redirect('/settings');
    }else if(listType == 'blacklist'){
        addWord(listType, newWord);
        res.redirect('/settings');
    };
};

function addWord (list, newWord) {
    AppSetting.findOneAndUpdate({instance:'1'},{$push: { [list] :newWord}}, (err) => {
        if(err){throw err;}
        console.log('New '+list+' word \''+newWord.word+'\' was added successfully...');
    });
}

settingsController.delete = (req, res) => {
    AppSetting.remove({_id: req.body.id}, (err) => {
        if(err){throw err};
        console.log('Word has been deleted...');

    });
};


module.exports = settingsController;