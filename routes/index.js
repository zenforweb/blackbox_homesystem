/*
 * GET home page.
 */
exports.index = function(req, res){
  /*app.settings['config']*/
  /* './sys/views/index' 	for install theme */
  res.render('./themes/tranquility/views/index', {
    'title': 'Blackbox',
    'test': 'asas',
    'port': ''
  })
};