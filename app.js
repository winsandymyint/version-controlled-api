var express = require('express'),
  config = require('./config/config'),
  mongoose = require('mongoose');
  
//MongoDB Connection
if(mongoose.connection.readyState != 1){
    console.log('Connecting DB : ' + config.db);
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function (err) {
      throw new Error('Unable to connect to database at ' + config.db + '\n' + err);
    });

    db.once('open', function() {
      console.log("We've connected!");
    });
}

// Bring in our dependencies
var app = express();
require('./config/express')(app, config);

// Turn on that server!
app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

module.exports = app