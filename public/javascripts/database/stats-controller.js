var Statistics = require('../models/statistics-model');
var Settings = require('../models/settings-model');
var SmPost = require('../models/sm-post-model');
var log = require('../helpers/logger');

const logger = 'STAT CTRL';


var statsController = {};

statsController.getPostOfTheWeek = (req, res) => {

    log.inf('Loading statistics.', logger);
    res.json({message: 'Hello World!'});

};

statsController.updateStats = () => {
    SmPost.find({keywordUsed:'pier'}).count((err, count) => {
        //console.log('COUNT: '+count);
    });
};

module.exports = statsController;