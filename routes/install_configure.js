/*
 * GET install configure.
 */
exports.install_configure = function(req, res){
  console.log('before render of view')
  res.render('./sys/views/index', {
      'title':'Blackbox Install Configuration'
      /*'data_storage':app.settings['config']['app_install']['data_storage'],
      'data_storage_version':app.settings['config']['app_install']['data_storage_version']*/
  })
}