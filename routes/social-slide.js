var express = require('express');
var router = express.Router();
var slideController = require('../public/javascripts/database/slide-controller');
var statsController = require('../public/javascripts/database/stats-controller');
var settingController = require('../public/javascripts/database/settings-controller');

router.get('/', (req, res) => {
    res.render('social-slide', {
        title: 'Social Slide'
    });
});

router.get('/stats', (req, res) => {
    res.render('statistics', {
        title: 'Statistics'
    });
});

router.get('/api/get/next-post', slideController.getNextPost);

router.get('/api/get/next-stat', statsController.getStatistics);

router.get('/api/get/slide-speed', settingController.getSlideSpeed);

module.exports = router;