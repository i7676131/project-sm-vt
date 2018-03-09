var Statistics = require('../models/statistics-model');
var Settings = require('../models/settings-model');
var SmPost = require('../models/sm-post-model');


var statsController = {};

statsController.getPostOfTheWeek = (req, res) => {

};

statsController.updateStats = () => {
    SmPost.find({keywordUsed:'pier'}).count((err, count) => {
        console.log('COUNT: '+count);
    });
};

module.exports = statsController;