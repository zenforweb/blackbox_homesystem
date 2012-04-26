function dashboard_controller(socket,jade,db_controller){
  this.dbase = db_controller;
  this.jade = jade;
  this.socket = socket;
  this.socket.on('get_settings',function(get_data){console.log(get_data)})
};
dashboard_controller.prototype = {
    _____: function(){
    }
};
module.exports.dashboard_controller = dashboard_controller;