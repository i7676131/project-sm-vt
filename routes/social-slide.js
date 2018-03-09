var express = require('express');
var router = express.Router();
var slideController = require('../public/javascripts/database/slide-controller');
var statsController = require('../public/javascripts/database/stats-controller');

router.get('/', (req, res) => {
    res.render('social-slide', {
        title: 'Social Slide'
    });
});

router.get('/api/get/next-post', slideController.getNextPost);

router.get('/api/get/next-stats', statsController.getStatistics);

module.exports = router;