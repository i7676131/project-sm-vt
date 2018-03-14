var log = require('../helpers/logger');
var mongoose = require('mongoose');
var conf = require('../../../config/system-config');
var uri = conf.database.dbUrl;
var db;
const logger = 'DB';

// MongoDb connection
log.inf('Connecting to MongoDb...', logger);
mongoose.connect(uri, (err) => {
  if (err){
      log.fat('Connection to MongoDb failed...\n'+err, logger);
      process.exit(0);
  }
  db = mongoose.connection;
  log.inf('App successfully connected to MongoDb - Port: '+db.port+' - Db: '+db.name, logger);
});