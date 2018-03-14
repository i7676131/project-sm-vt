var log = require('../helpers/logger');
var mills = {};

mills.minsToMills = (minutes) => {
    if (isNaN(minutes)) {
        log.err('Input variable is not a number, returning default \'900000\'.');
        return 900000;
    } else {
        return minutes * 60000;
    }
};

mills.secsToMills = (seconds) => {
    if (isNaN(seconds)) {
        log.err('Input variable is not a number, returning default \'10000\'.');
        return 10000;
    }else if(seconds === '' || seconds === null){
        log.err('Input variable is empty or null, returning default \'10000\'.');
        return 10000;
    } else {
        return seconds * 1000;
    }
};

module.exports = mills;