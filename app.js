var db = require('./public/javascripts/database/db');
var log = require('./public/javascripts/helpers/logger');
var conf = require('./config/system-config');
var express = require('express');
var cors = require('cors')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var updater = require('./public/javascripts/system/auto-updater');
//var stat = require('./public/javascripts/database/statistics-db');
var socialSlide = require('./routes/social-slide');
var settings = require('./routes/settings');
var about = require('./routes/about');

//stat.getDailyTotal();

// create global app object
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/social-slide', socialSlide);
app.use('/settings', settings);
app.use('/about', about);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;