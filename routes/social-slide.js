var express = require('express');
var router = express.Router();
var smPostModel = require('../public/javascripts/models/sm-post-model.js');

/*router.get('/', function(req, res) {

    res.render('social-slide', {
        source: '/images/slide_image1.jpg',
        title: 'Social Slide',
        smName: 'Tyrone Williams',
        smUsername: '@Mr_Rone_',
        smPostContent: 'Beach walk after eating at @HarryRamsdensUk, perfect. #FishAndChips #Beach #BeachWalks #Bournemouth' +
        ' #Home #Sunset',
        smDate: '25 Jan 2018',
        smAvatar: '/images/profile_pic.jpg',
        smLogo: '/images/logos/Twitter_Logo_Blue.png'
    });
});*/

router.get('/', function(req, res) {

    res.render('social-slide',{
        title: 'Social Slide'
    });

});

router.get('/api/test', function(req, res) {

    var smPost = {
        postId: 1,
        listPriority: 1,
        name: 'Tyrone Williams',
        userName: 'Mr_rone_',
        postContent: 'Great day at the beach today. Chips were lovely. #Btown #Bournemouth #Beach #FishAndChips',
        postDate: '25 Jan 2018',
        postAvatarUrl: '/images/profile_pic.jpg',
        postImgUrl: '/images/slide_image1.jpg',
        smPlatformLogo: '/images/logos/Twitter_Logo_Blue.png'
    };
    // use mongoose to get all todos in the database
    /*smPostModel.find(function(err, smPost) {

        if (err) {
            res.send(err)
        }

        res.json(smPost); // return all todos in JSON format
    });*/

    res.json(smPost);
});

module.exports = router;