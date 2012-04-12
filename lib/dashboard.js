function dashboard_controller(socket,jade,db_controller){
  this.dbase = db_controller;
  this.jade = jade;
  this.socket = socket;
};
dashboard_controller.prototype = {
    _____: function(){
    }
};
module.exports.dashboard_controller = dashboard_controller;