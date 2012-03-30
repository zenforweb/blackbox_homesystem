/*
 * GET home page.
 */
var account_login = require('./account/login');

exports.index = function(req, res){
  res.render('index', {
  	title: 	'Blackbox',
  	test: 	'value'
  })
};
exports.account_login = account_login.login;
/*
 * GET LOGIN LOGIC


exports.login = function(req, res){
  res.render('index', {
  	title: 	'Blackbox_user_test',
  	test: 	'test'
  })
};
 */