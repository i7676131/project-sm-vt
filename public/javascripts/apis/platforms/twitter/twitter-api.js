var SmPostModel = require('../../../models/sm-post-model');

exports.addNewDocs = function () {

    let newPost1 = new SmPostModel({
        smPostId: '1',
        smListPriority: 'medium',
        smName: 'Amy Bennett',
        smUserName: '@abennett_x',
        smContent: 'There is honestly nothing better than walking down the beach while watching the sunset over the pier' +
        '... love this town!!! #Bournemouth #Pier #BournemouthPier #Beach',
        smDate: '2 Feb 2018',
        smAvatarUrl: '/images/profile_pic.jpg',
        smImageUrl: '/images/slide_image3.jpg',
        smPlatform: '/images/logos/facebook-logo.png'
    });
    let newPost2 = new SmPostModel({
        smPostId: '2',
        smListPriority: 'high',
        smName: 'Tyrone Williams',
        smUserName: '@mr_rone_',
        smContent: 'Great day at the beach today. Chips were lovely. #Btown #Bournemouth #Beach #FishAndChips',
        smDate: '23 Jan 2018',
        smAvatarUrl: '/images/profile_pic.jpg',
        smImageUrl: '/images/slide_image1.jpg',
        smPlatform: '/images/logos/twitter-logo.png'
    });
    let newPost3 = new SmPostModel({
        smPostId: '3',
        smListPriority: 'high',
        smName: 'Damian Wilmer',
        smUserName: '@dwill',
        smContent: 'At University doing my final year project. Java is really doing my nut in right now. #Bournemouth' +
        ' #Java #FYP #Diss',
        smDate: '25 Feb 2018',
        smAvatarUrl: '/images/profile_pic.jpg',
        smImageUrl: '/images/slide_image3.jpg',
        smPlatform: '/images/logos/facebook-logo.png'
    });

    newPost1.save(function(err){
        if(err){ throw err };
        console.log('New post saved successfully...')
    });
    newPost2.save(function(err){
        if(err){ throw err };
        console.log('New post saved successfully...')
    });
    newPost3.save(function(err){
        if(err){ throw err };
        console.log('New post saved successfully...')
    });

};