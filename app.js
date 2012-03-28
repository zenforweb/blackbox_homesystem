/**
 * Module dependencies.
 */
var db_base = require('./lib/dbase.js')
var config = require('./config.js');
var express = require('express'),
    routes = require('./routes');
var app = module.exports = express.createServer();
var db_controller = new db_base.Dbase_controller(config['config']['db_host'],config['config']['db_port'],config['config']['db_user'],config['config']['db_pass'],config['config']['db_pool_size']);
db_controller.create_connection_pool();
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
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

app.listen(config['config']['app_port']);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
