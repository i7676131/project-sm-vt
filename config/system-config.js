module.exports = {
    database: {
        dbUrl: 'mongodb://localhost/DevDb',
    },
    server: {
        port: '3000'
    },
    settings: {
        settingDocObjectId: '5a985a4917fd01299334e96c'
    },
    twitter: {
        consumer_key: '',
        consumer_secret: '',
        bearer_token: '',
        count: 15,                                      // Number of Tweets returned per keyword.
        result_type: 'recent',                          // Either 'recent', 'popular' or 'mixed'.
        lang: 'en',                                     // Language based on ISO 639-1 code.
        tweet_mode: 'extended',                         // Allows app to get Media elements **DO NOT MODIFY**.
        geocode: '50.72048,-1.8795,50mi'                // Default if none selected (Bournemouth).
    }
};
