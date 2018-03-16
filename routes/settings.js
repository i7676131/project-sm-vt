var express = require('express');
var router = express.Router();
var settingsController = require('../public/javascripts/database/settings-db');

router.get('/', settingsController.getSettings);

router.post('/add', settingsController.addListItem);

router.post('/update', settingsController.update);

router.post('/delete', settingsController.delete);

module.exports = router;