let fmtDate = require('../helpers/format-date');
let log = require('../helpers/logger');
const logger = 'STATS MAPPER';

let mapper = {};

mapper.convertToChartData = (stats) => {

    let chartTemplateData = {
        dailyTotal: {
            title: '',
            data: [],
            labels: []
        },
        weeklyPosts: {
            title: '',
            data: [],
            labels: []
        }
    };

    if (typeof stats !== 'undefined' && typeof stats[0] !== 'undefined' && typeof stats[1] !== 'undefined') {
        let dailyStats = stats[0];
        let weeklyStats = stats[1][0];

        // Loop through the daily stats and add to json template.
        chartTemplateData.dailyTotal['title'] = 'Total Daily Posts';
        for (let i = 0; i < dailyStats.length; i++) {
            chartTemplateData.dailyTotal.data.push(dailyStats[i].dayTotal);
            chartTemplateData.dailyTotal.labels.push(fmtDate.getDaySuffix(dailyStats[i].day));
        }

        // Loop through weekly stats and add to json template - and format query info.
        chartTemplateData.weeklyPosts['title'] = 'Popular Posts of Week No. ' + weeklyStats.weekOfYear;
        for (let i = 0; i < weeklyStats.words.length; i++) {
            chartTemplateData.weeklyPosts.data.push(weeklyStats.words[i].total);
            chartTemplateData.weeklyPosts.labels.push(weeklyStats.words[i].query
                .replace(/from:/ig,'From: @')
                .replace(/filter:media/ig, '')
                .replace(/-RT/ig, ''));
        }
        return chartTemplateData;
    } else {
        log.err('Stats is undefined / empty.', logger);
        chartTemplateData.dailyTotal['title'] = 'Stats are empty: See Logs.';
        chartTemplateData.weeklyPosts['title'] = 'Stats are empty: See Logs.';
        return chartTemplateData;
    }
};

module.exports = mapper;