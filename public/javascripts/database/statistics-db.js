let fmtDate = require('../helpers/format-date');
let WeeklyPosts = require('../models/weekly-posts-model');
let DailyTotal = require('../models/daily-total-model');
let SmPost = require('../models/sm-post-model');
let Settings = require('../database/settings-db');
let mapper = require('../helpers/stats-mapper');
let log = require('../helpers/logger');

const logger = 'STAT DB';

let statsController = {};

statsController.getStatistics = (req, res) => {

    let allStats = [];

    allStats.push(getDailyTotal());
    allStats.push(getWeeklyPosts());

    Promise.all(allStats).then((stats) => {

        res.json(mapper.convertToChartData(stats));

    }).catch((err) => {
        log.err('Problem getting statistics: ' + err, logger);
    });

};

function getWeeklyPosts() {
    let wc = fmtDate.getWeek();

    return new Promise((resolve, reject) => {
        WeeklyPosts.find({weekOfYear: wc}, (err, docs) => {
            if (err) {
                log.err(err);
                reject(err);
            }
            resolve(docs);
        });
    });
}

function getDailyTotal() {
    return new Promise((resolve, reject) => {
        DailyTotal.find({}).limit(10).sort({day: 1}).exec((err, docs) => {
            if (err) {
                log.err(err, logger);
                reject(err);
            }
            resolve(docs);
        });
    });
}

statsController.updateDailyTotal = () => {

    runDayAddedQuery().then((addedTodayCount) => {
        DailyTotal.update(
            {day: fmtDate.getDay(Date.now())},
            {dayTotal: addedTodayCount},
            {upsert: true}, (err) => {
                if (err) {log.err(err, logger);}
                log.inf('Daily total has been updated to '+addedTodayCount+'.', logger);
            });
    }).catch((err) => {
        log.err(err, logger)
    });
};

function runDayAddedQuery() {
    return new Promise((resolve, reject) => {
        SmPost.find({dayAdded: fmtDate.getDay(Date.now())}).exec((err, posts) => {
            if (err) {
                log.err(err, logger);
                reject(err);
            }
            resolve(posts.length);
        });
    });
}

statsController.updateWeeklyPosts = () => {

    Settings.getWhitelist().then((keywords) => {

        let keywordCount = [];

        for(let i = 0; i < keywords.length; i++){
            keywordCount.push(runWeekAddedQuery(keywords[i].word));
        }

        return Promise.all(keywordCount);

    }).then((countArray) => {

        WeeklyPosts.update(
            {weekOfYear: fmtDate.getWeek()},
            {words: countArray},
            {upsert: true}, (err) => {
                if(err){log.err(err, logger);}
                log.inf('Weekly total has been updated.', logger);
            });

    }).catch((err) => {
        log.err(err, logger)
    });
};

function runWeekAddedQuery(keyword) {
    return new Promise((resolve, reject) => {
        SmPost.find({weekOfYearAdded: fmtDate.getWeek(), keywordUsed: keyword}).exec((err, posts) => {
            if (err) {
                log.err(err, logger);
                reject(err);
            }
            resolve({query: keyword, total: posts.length});
        });
    });
}

module.exports = statsController;