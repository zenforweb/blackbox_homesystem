function dashboard_controller(socket,jade,db_controller){
  this.dbase = db_controller;
  this.jade = jade;
  this.socket = socket;
  this_class = this
  this_class.socket.on('get_settings',function(get_data){
    var t_file = require('fs').readFileSync('./public/themes/tranquility/views/settings.jade','utf8');
    var j_funct = this_class.jade.compile(t_file, {filename:'',pretty: true});
    var rendered_template = j_funct({
    	'test':'test'
    });
    this_class.socket.emit('settings_loaded',{
		'page': rendered_template
    })
  })
};
dashboard_controller.prototype = {
    _____: function(){
    }
};
module.exports.dashboard_controller = dashboard_controller;