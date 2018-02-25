module.exports = {

    database: {
        dbUrl: 'mongodb://localhost/DevDb',
        dbConnRetry: '3'
    },
    server: {
        port: '3000'
    },
    api: {
        /*
        Specify the amount of time for which the API handler will get new social media data.
        Must be a minimum of 15 minutes, as this is the window that Twitter resets its API call rate. If it is any less,
        Twitter (and others) may reject the API calls and suspend this app from making new calls for a period of time.
        */
        refresh: '15' // mins
    }
};