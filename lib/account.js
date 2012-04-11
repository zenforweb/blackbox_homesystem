module.exports.login = function(socket,jade,dbase){
  socket.on('login_attempt',function(login_data){
    user = login_data['username'];
    pass = login_data['pass'];
    query_string = "SELECT * FROM logic_1.userSecure WHERE user='"+user+"' and pass='"+pass+"'";
    dbase.query(query_string, function(result_object){
      if (result_object['raw_response'].length == 1){
	var t_file = require('fs').readFileSync('./public/default_theme/dashboard.jade','utf8');
        var j_funct = jade.compile(t_file, {filename:'',pretty: true});
	var rendered_template = j_funct({'test':'test'});
	socket.emit('login_success',{
	  'status':true,
	  'status_message':'Login Successful.',
	  'session_id':'not implemented',
	  'username':user,
	  'form_id':login_data['form_id'],
	  'user_id':result_object['raw_response'][0]['user_id'],
	  'page': rendered_template
	})
      }else{
	socket.emit('login_failure',{
	  'status':false,
	  'status_message':'User does not exist.',
	  'page':'',
	  'form_id':login_data['form_id']
	})
      }
    })
  });
};