var mongoose = require('mongoose');
var conf = require('../../../config/system-config');
var uri = conf.database.dbUrl;
var db;

// MongoDb connection
console.log('MONGO: Connecting to MongoDb...');
mongoose.connect(uri, (err) => {
  if (err){
      console.log('MONGO: Connection to MongoDb failed...\n'+err);
      process.exit(0);
  }
  db = mongoose.connection;
  console.log('MONGO: App successfully connected to MongoDb. \nPort: '+db.port+'\nDb: '+db.name);
});

process.on('', () =>{
   db.close(() => {
      console.log('MONGO: Applicaiton encountered an error, closing connection...');
   });
});