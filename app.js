/**
 * Module dependencies.
 */


var config = require('./config.js');


var express = require('express');
var routes = require('./routes');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);



// Configuration
app.configure(function(){
  app.set('views', __dirname + '/public/');
  app.set('view engine', 'jade');
  //app.set('db', db_controller);
  app.set('config', config);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
io.sockets.on('connection', function(socket){
  var db_base = require('./lib/dbase.js');
  var account = require('./lib/account.js');
  var dashboard = require('./lib/dashboard.js');
  var jade = require('jade');
  var db_controller = new db_base.Dbase_controller(config['db_settings']['db_host'],config['db_settings']['db_port'],config['db_settings']['db_user'],config['db_settings']['db_pass'],config['db_settings']['db_pool_size']);
db_controller.create_connection_pool();
  console.log('on connection')
  dashboard_controller = new dashboard.dashboard_controller(socket,jade,db_controller);
  console.log('post dashboard')
  console.log(account)
  console.log('post account')
  try{
    account = new account.account_controller(socket,jade,db_controller,dashboard_controller,config);
  }
  catch(err){
    console.log( 'Error: ' + err );
  }
});

app.listen(config['app_settings']['app_port']);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);