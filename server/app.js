#!/usr/bin/env node

/**
 *
 *
 * Sendlist Web Server
 * Made by @dantaex
 * 
 */

/**
 * Server dependencies
 */
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    debug = require('debug')('express-default:server'),
    http = require('http');

/**
 * Database Wrapper
 */
var mongoose = require('mongoose');

var config = require('./config'),
    router = require('./router');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, config.public_dir)));

app.use('/', router);

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*----------  Error Handlers  ----------*/

/**
 * development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

/**
 * production error handler
 * no stacktraces leaked to user
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


/**
 * Get port from environment and store in Express.
 */
var port = parseInt(process.env.PORT, 10) || config.test_port;
app.set('port', port);


/*----------  Database setup  ----------*/

/**
 * Create database connection
 */
var db_uri = config.database_uri_PROD || config.database_uri_DEV;
mongoose.connect(db_uri);

/**
 * Connection ready event hanlder
 */
mongoose.connection.on('open',function(){
  console.log('\033[36m \t[OK] mongoose CONNECTED to '+db_uri+' \033[39m\n');
});

/**
 * Connection error event hanlder
 */
mongoose.connection.on('error',function(){
  console.log('\033[31m \t[ERROR] Impossible to connect to '+db_uri+' \033[39m');
});



/*----------  HTTP Server bootstrapping  ----------*/


/**
 * Create HTTP server.
 */
var server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', function() {
  console.log(
    '\n\t' + 
    config.app_name +
    ' server listening on port ' + 
    server.address().port);
});