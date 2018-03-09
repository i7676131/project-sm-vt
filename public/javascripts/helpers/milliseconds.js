var mills = {};

mills.minsToMills = (minutes) => {
    if (isNaN(minutes)) {
        throw new Error('ERROR: Input variable is not a number - function minsToMills');
    } else {
        return minutes * 60000;
    }
};

module.exports = mills;