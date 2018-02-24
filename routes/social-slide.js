var express = require('express');
var router = express.Router();
var SmPostModel = require('../public/javascripts/models/sm-post-model');

router.get('/', function(req, res) {

    res.render('social-slide-p',{
        title: 'Social Slide'
    });

});

router.get('/api/get/next-post', function(req, res) {

    SmPostModel.findOne({postId:'1'}, function(err, smPost) {

        if (err) {
            res.send(err)
        }
        console.log("Result from db: "+smPost);

        res.json(smPost);
    })

});

module.exports = router;