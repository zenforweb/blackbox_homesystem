/*
 * GET install fail.
 */
exports.install_fail = function(req, res){
  res.render('./sys/views/', {
      'title':'Blackbox Install Fail',
      'fail_message':app.settings['config']['app_install']['install_message']
  })
}