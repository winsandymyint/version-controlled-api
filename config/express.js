var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config) {
  app.disable('x-powered-by');
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Cache-Control', 'no-cache');
    next();
  });

  var routes = glob.sync(config.root + '/routes/*.js');
  routes.forEach(function (route) {
    require(route)(app);
  });

  app.get('/',function(req,res){
    res.redirect('/welcome');
  })
  app.use('/welcome', express.static(process.cwd() + '/public/index.html'));

  app.all('*',function(req,res){
  //not found
    res.sendStatus(404);
  });
};
