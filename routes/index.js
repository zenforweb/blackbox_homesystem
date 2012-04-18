/*
 * GET home page.
 */
exports.index = function(req, res){
  /*app.settings['config']*/
  res.render('./themes/tranquility/views/index', {
    'title': 'Blackbox',
    'test': 'asas',
    'port': ''
  })
};
