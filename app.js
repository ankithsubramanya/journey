var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//App api routes
var index = require('./routes/index');
var users = require('./routes/users');
var cities = require('./routes/cities');
var flights = require('./routes/flights');
var countries = require('./routes/countries');
var hotels = require('./routes/hotels');
var restaurants = require('./routes/restaurants');
var trips = require('./routes/trips');
var usertrips = require("./routes/usertrips");
var cityhotels = require("./routes/cityhotels")
//Util
var TripConstructor = require('./util/TripConstructor')
//MongoDB requirements
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express();

// view engine setup
//app.set('pages', path.join(__dirname, 'pages'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.use('/api/users', users);
app.use('/api/cities', cities);
app.use('/api/flights', flights);
app.use('/api/countries', countries);
app.use('/api/hotels', hotels);
app.use('/api/restaurants', restaurants);
app.use('/api/trips', trips);
app.use('/api/usertrips', usertrips);
app.use('/api/cityhotels', cityhotels);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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


// Connection to MongoDB
// please add process.env.MONGODD_URI instead of hardcoded uri when deploying

mongodb.MongoClient.connect(process.env.MONGO_CONNECTION_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    // Save database object from the callback for reuse.
    var db = database;
    console.log("Database connection ready");
});


//app.set('view engine', 'jade');
app.use('/', express.static(__dirname + '/'));

module.exports = app;
