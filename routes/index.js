/*
 * GET home page.
 */
var install_configure = require('./install_configure.js').install_configure
exports.index = function(req, res){
  /*app.settings['config']*/
  res.render('./themes/tranquility/views/index', {
    'title': 'Blackbox',
    'test': 'asas',
    'port': ''
  })
};
exports.install_configure = install_configure;