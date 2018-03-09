var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var formatDate = {};

formatDate.twitterDate = (date) => {

    let newDate = new Date(date);

    let d = newDate.getDay();
    let m = months[newDate.getMonth()];
    let y = newDate.getFullYear();

    return d+' '+m+' '+y;
};

module.exports = formatDate;