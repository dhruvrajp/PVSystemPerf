var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var flash = require('connect-flash')
var session= require('express-session');
var busboy = require('connect-busboy');

var main = require('./routes/index');
var addCerti = require('./routes/addCerti');
var sequelize = require('./node_modules/sequelize');
var solarSystemInfo=require('./routes/solarSystemInfo');
var failureModes = require('./routes/failureModes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secretSession' }));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());


app.use('/', main);
app.use('/addCerti', addCerti);
app.use('/solarSysteminfo', solarSystemInfo)
require(path.join(__dirname+'/routes/addPv.js'))(app);
app.use('/solarSysteminfo', solarSystemInfo);
app.use('/failureModes', failureModes);
require(path.join(__dirname+'/routes/addPv.js'))(app);
require(path.join(__dirname+'/routes/loginReg.js'))(app);
require(path.join(__dirname+'/routes/addCertiForm.js'))(app);
require(path.join(__dirname+'/routes/solarSystemInfoResults.js'))(app);
require(path.join(__dirname+'/routes/testDataRoutes.js'))(app);
require(path.join(__dirname+'/routes/failureModesResults.js'))(app);
require(path.join(__dirname+'/routes/monitoringData.js'))(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
