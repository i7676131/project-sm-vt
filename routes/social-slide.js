var express = require('express');
var router = express.Router();
var SmPostModel = require('../public/javascripts/models/sm-post-model');

// path for /social-slide
router.get('/', (req, res) => {
    res.render('social-slide',{
        title: 'Social Slide'
    });
});

// path for /social-slide/api/get/next-post
router.get('/api/get/next-post', (req, res) => {

    // TODO sort collection by date and serve to Angular controller.
    // TODO also check if that post has been used the same day, we don't want the same posts to be cycled through all day.

    /*let statPage = res.getAttribute('load-stat-page');

    if(statPage){

    }*/

    var posts = [1,2,3];
    var i = posts[Math.floor(Math.random()*posts.length)];
    console.log('Post Id: '+i);
    SmPostModel.findOne({smPostId: i}, (err, smPost) => {

        if (err) { throw err; }

        console.log("Result from db:\n"+smPost);
        res.json(smPost);
    })
});

module.exports = router;