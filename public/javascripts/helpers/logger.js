var log4js = require('log4js');

log4js.configure({

    appenders: {
        out: {type: 'stdout', layout: {type: 'coloured'}},
        app: {type: 'file', filename: 'application.log'}
    },
    categories: {
        default: {appenders: ['out', 'app'], level: 'info'}
    }
});

var log = log4js.getLogger();

module.exports = {

    inf: function (message, logger) {
        log = log4js.getLogger(logger);
        log.info(message);
    },

    err: function (message, logger) {
        log = log4js.getLogger(logger);
        log.error(message);
    },

    war: function (message, logger) {
        log = log4js.getLogger(logger);
        log.warn(message);
    },
    fat: function (message, logger) {
        log = log4js.getLogger(logger);
        log.fatal(message);
    }
};
