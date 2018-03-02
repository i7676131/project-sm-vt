var express = require('express');
var router = express.Router();
var settingsController = require('../public/javascripts/controllers/settings-controller');


// path for /social-slide
/*router.get('/', (req, res) => {

    let set = settingsController.getSettings(req, res);
    res.render('settings',{
        title: 'Settings',
        appSettings: set
    });
});*/

router.get('/', settingsController.getSettings);

router.post('/', settingsController.addListItem);

router.put('/');

router.delete('/:id', (req, res) => {

});

module.exports = router;