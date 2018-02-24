


exports.addTestItems = function(db){

    db.collection('').insertOne({
        postId: 1,
        listPriority: 1,
        smName: 'Tyrone',
        smUserName: 'Mr_rone_',
        smContent: 'Great day at the beach today. Chips were lovely. #Btown #Bournemouth #Beach #FishAndChips',
        smDate: '25 Jan 2018',
        smAvatarUrl: '/images/profile_pic.jpg',
        smImageUrl: '/images/slide_image1.jpg',
        smPlatformLogo: '/images/logos/Twitter_Logo_Blue.png'
    }).then(function(result){
        console.log('Result: ');
    })


};