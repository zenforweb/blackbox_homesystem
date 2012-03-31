/*
 * GET home page.
 */
var account_login = require('./account/login');

exports.index = function(req, res){
  res.render('index', {
  	'title': 'Blackbox',
  	'test': 'asas',
  	'port': ''
  })
};
exports.account_login = account_login.login;
