var log = require('../helpers/logger');
const logger = 'MILLISECONDS';
var mills = {};

mills.minsToMills = (minutes) => {
    if (isNaN(minutes)) {
        log.err('Input variable is not a number, returning default \'900000\'.');
        return 900000;
    } else {
        return minutes * 60000;
    }
};

module.exports = mills;