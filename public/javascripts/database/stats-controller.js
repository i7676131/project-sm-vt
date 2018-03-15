var WeeklyPosts = require('../models/weekly-posts-model');
var DailyTotalPosts = require('../models/daily-total-model');
var Settings = require('../models/settings-model');
var SmPost = require('../models/sm-post-model');
var log = require('../helpers/logger');

const logger = 'STAT CTRL';

var statsController = {};

statsController.getStatistics = (req, res) => {

    /*let allStats = [];

    allStats.push(getWeeklyPosts());

    allStats.push(getDailyTotal());

    Promise.all(allStats).then((stats) => {

        res.json(stats);

    }).catch((err) => {
        log.err('Problem getting statistics: '+err);
    });*/

    let testData = {
        weeklyPosts:{
            title: 11,
            labels: ['from:mr_rone_','#bournemouth filter:media -RT','#siliconbeach filter:media', 'from:ratio -RT',
                '#london filter:media -RT', '#beach filter:media -RT'],
            data: [121,189,152,20,202,178]
        },
        dailyTotal: {
            labels: ['10th','11th','12th','13th','14th','15th','16th','17th','18th','19th'],
            data: [304,289,300,260,345,310,302,332,289,299]
        }
    };

    res.json(testData);

};

function getWeeklyPosts () {

    log.inf('Loading posts of the week...', logger);


}

function getDailyTotal () {

    log.inf('Loading daily total...', logger);

};

statsController.updateDailyTotal = () => {
    SmPost.find({keywordUsed:'pier'}).count((err, count) => {
        //console.log('COUNT: '+count);
    });
};

statsController.updateWeeklyPosts = () => {

};

module.exports = statsController;