var express = require('express');
var router = express.Router();
var postController = require('../public/javascripts/database/post-db');
var statsController = require('../public/javascripts/database/statistics-db');
var settingController = require('../public/javascripts/database/settings-db');

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

router.get('/api/get/next-post', postController.getNextPost);

router.get('/api/get/next-stat', statsController.getStatistics);

router.get('/api/get/slide-speed', settingController.getSlideSpeed);

module.exports = router;