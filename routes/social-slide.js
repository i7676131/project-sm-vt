var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {


    res.render('social-slide', {
        source: getNextImage(),
        title: 'Social Slide',
        smName: 'Tyrone Williams',
        smUsername: '@Mr_Rone_',
        smPostContent: 'Beach walk after eating at @HarryRamsdensUk, perfect. #FishAndChips #Beach #BeachWalks #Bournemouth' +
        ' #Home #Sunset',
        smDate: '25 Jan 2018',
        smAvatar: '/images/profile_pic.jpg',
        smLogo: '/images/logos/Twitter_Logo_Blue.png'
    });
});

router.get('/statistics', function(req, req, next) {


});

function getNextImage(){
    return '/images/slide_image1.jpg'
}

module.exports = router;