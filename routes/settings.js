var express = require('express');
var router = express.Router();
var settingsController = require('../public/javascripts/controllers/settings-controller');

router.get('/', settingsController.getSettings);

router.post('/add', settingsController.addListItem);

router.put('/');

router.post('/delete', settingsController.delete);

module.exports = router;