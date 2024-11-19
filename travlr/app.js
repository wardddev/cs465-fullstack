var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Define routers
var indexRouter = require('./app_server/routes/index');     // Add comments
var usersRouter = require('./app_server/routes/users');     // Add comments
var travelRouter = require('./app_server/routes/travel');   // Add comments
var roomsRouter = require('./app_server/routes/rooms');     // Add comments
var aboutRouter = require('./app_server/routes/about');     // Add comments
var mealsRouter = require('./app_server/routes/meals');     // Add comments
var newsRouter = require('./app_server/routes/news');       // Add comments
var contactRouter = require('./app_server/routes/contact'); // Add comments

var apiRouter = require('./app_api/routes/index');

var handlebars = require('hbs');

// Handles user authentication
var passport = require('passport');
require('./app_api/config/passport');

// Bring in the database
require('./app_api/models/db'); // Establish MongoDB connection

// Manage API keys
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials
handlebars.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

// Define middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Enable CORS
// FIX: Make Access-Control-Allow-Origin dynamic to avoid exposing to unintended domains
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Catches unauthorized error and create 401
// FIX: Add logging to track unauthorized access attempts for security audits
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

// Define routes
app.use('/', indexRouter);          // Add comments
app.use('/users', usersRouter);     // Add comments
app.use('/travel', travelRouter);   // Add comments
app.use('/rooms', roomsRouter);     // Add comments
app.use('/about', aboutRouter);     // Add comments
app.use('/meals', mealsRouter);     // Add comments
app.use('/news', newsRouter);       // Add comments
app.use('/contact', contactRouter); // Add comments
app.use('/api', apiRouter);         // Add comments

// Catches 404 errors, renders error pages
// FIX: Add logging to track errors for debugging
app.use(function(req, res, next) {
  next(createError(404));
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