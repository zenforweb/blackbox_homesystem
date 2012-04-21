/*
 * GET install user_setup.
 */
exports.install_user_setup = function(req, res){
  res.render('./setup/views/', {
      'title':'Blackbox Install First User'
  })
}