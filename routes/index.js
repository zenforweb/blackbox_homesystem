/*
 * GET home page.
 */
exports.index = function(req, res){
  /*app.settings['config']*/
  res.render('./default_theme/index', {
    'title': 'Blackbox',
    'test': 'asas',
    'port': ''
  })
};
