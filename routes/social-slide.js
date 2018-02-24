var express = require('express');
var router = express.Router();
var SmPostModel = require('public/javascripts/models/sm-post-model');
// var smPost = {
//     postId: 1,
//     listPriority: 1,
//     smName: 'Tyrone',
//     smUserName: 'Mr_rone_',
//     smContent: 'Great day at the beach today. Chips were lovely. #Btown #Bournemouth #Beach #FishAndChips',
//     smDate: '25 Jan 2018',
//     smAvatarUrl: '/images/profile_pic.jpg',
//     smImageUrl: '/images/slide_image1.jpg',
//     smPlatformLogo: '/images/logos/Twitter_Logo_Blue.png'
// };

router.get('/', function(req, res) {

    res.render('social-slide-p',{
        title: 'Social Slide'
    });

});

router.get('/api/test', function(req, res) {

    // use mongoose to get all todos in the database

    SmPostModel.findOne(function(err, smPost) {

        if (err) {
            res.send(err)
        }

        res.json(smPost); // return all todos in JSON format
    });

//    res.json(smPost);
});

module.exports = router;