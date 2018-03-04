var SmPostModel = require('../models/sm-post-model');
var slideController = {};

slideController.nextPost = (req, res) => {

    // TODO: implement logic to get the next post by date and if its been used on the same day.

    var posts = [1,2,3];
    var i = posts[Math.floor(Math.random()*posts.length)];
    console.log('Post Id: '+i);
    SmPostModel.findOne({smPostId: i}, (err, smPost) => {

        if (err) { throw err; }

        console.log("Result from db:\n"+smPost);
        res.json(smPost);
    })
};

slideController.nextStat = (req, res) => {

    // TODO complete stats section, including model.


    res.json('');
};

module.exports = slideController;