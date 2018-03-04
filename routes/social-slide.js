var express = require('express');
var router = express.Router();
var SmPostModel = require('../public/javascripts/models/sm-post-model');
var slideController = require('../public/javascripts/controllers/slide-controller');

// path for /social-slide
router.get('/', (req, res) => {
    res.render('social-slide',{
        title: 'Social Slide'
    });
});

router.get('/api/get/next-post', slideController.nextPost);

module.exports = router;