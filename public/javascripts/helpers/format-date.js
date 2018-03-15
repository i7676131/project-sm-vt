let week = require('current-week-number');
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

let formatDate = {};

formatDate.twitterDate = (post) => {
    let newDate = new Date(post.smDate);
    let d = newDate.getUTCDate();
    let m = months[newDate.getMonth()];
    let y = newDate.getFullYear();
    let date = d+' '+m+' '+y;
    return {
        smDate: date,
        smPlatform: post.smPlatform,
        smContent: post.smContent,
        smAvatarUrl: post.smAvatarUrl,
        smImageUrl: post.smImageUrl,
        smUserName: post.smUserName,
        smName: post.smName
    }
};

formatDate.getWeek = () => {
    return week();
};

formatDate.getWeekFromDate = (date) => {
    return week(date);
};

module.exports = formatDate;