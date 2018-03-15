var WeeklyPosts = require('../models/weekly-posts-model');
var TotalPosts = require('../models/daily-total-model');
var Settings = require('../models/settings-model');
var SmPost = require('../models/sm-post-model');
var log = require('../helpers/logger');

const logger = 'STAT CTRL';


var statsController = {};

statsController.getWeeklyPosts = (req, res) => {

    log.inf('Loading posts of the week...', logger);
    res.json({message: 'Hello World!'});

};

statsController.getTotalPosts = (req, res) => {

    log.inf('Loading weekly total posts...', logger);
    res.json({message: 'Hello World!'});

};

statsController.updateWordTotal = () => {
    SmPost.find({keywordUsed:'pier'}).count((err, count) => {
        //console.log('COUNT: '+count);
    });
};

statsController.updateWeeklyTotal = () => {

};

module.exports = statsController;