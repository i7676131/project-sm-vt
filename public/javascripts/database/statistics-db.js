let WeeklyPosts = require('../models/weekly-posts-model');
let DailyTotal = require('../models/daily-total-model');
let SmPost = require('../models/sm-post-model');
let log = require('../helpers/logger');

const logger = 'STAT DB';

let statsController = {};

statsController.getStatistics = (req, res) => {

    /*let allStats = [];

    allStats.push(getWeeklyPosts());

    allStats.push(getDailyTotal());

    Promise.all(allStats).then((stats) => {

        res.json(stats);

    }).catch((err) => {
        log.err('Problem getting statistics: '+err);
    });*/

    statsController.getDailyTotal();

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

statsController.getDailyTotal = () => {

    //log.inf('Loading daily total...', logger);

    // .find({}).limit(10).sort({statDate: -1}).exec((err, docs) => {

    DailyTotal.find({}, (err, docs) => {

        if(err){throw err;}

        log.inf(docs, logger);

    });
};

statsController.updateDailyTotal = () => {

};

statsController.updateWeeklyPosts = () => {

};

module.exports = statsController;