function account_controller(socket,jade,dbase,dashboard_controller,config){
	console.log('in account init')
    this.dbase = dbase;
    this.jade = jade;
    this.socket = socket;
    this.dashboard_controller = dashboard_controller;
    this.user = '';
    this.config = config
    var this_class = this;
	this_class.socket.on('login_attempt', function(login_data){
		this_class.login(login_data);	
	})
}
account_controller.prototype = {
    emit_login_failure: function(login_data,status_message){
	var this_class = this;
	status_message = status_message;
	this_class.socket.emit('login_failure',{
	    'status':false,
	    'status_message':status_message,
	    'page':'',
	    'form_id':login_data['form_id']
	})
    },
    process_preferences: function(pref_result){
	preferences = pref_result[0];
	return preferences
    },
    login: function(login_data){
	var this_class = this;
	user = login_data['username'];
	pass = login_data['pass'];
	query_string = "SELECT * FROM logic_1.userSecure WHERE user='"+user+"' and pass='"+pass+"'";
	login = false;
	this_class.dbase.query(query_string, function(user_lookup_result){
	    if (user_lookup_result['raw_response'].length == 1){
		user_info_query = "SELECT * FROM "+this_class.config['db_settings']['database_name']+".user_info WHERE user_id="+user_lookup_result['raw_response'][0]['user_id'];
		this_class.dbase.query(user_info_query,function(user_info_results){
		    user_pref_query = "SELECT * FROM "+this_class.config['db_settings']['database_name']+".user_preferences  WHERE user_id="+user_lookup_result['raw_response'][0]['user_id']+" and theme_id="+user_info_results['raw_response'][0]['theme_in_use'];
		    this_class.dbase.query(user_pref_query,function(user_pref_result){
			if (user_pref_result['raw_response'].length == 1){
			    prefs = this_class.process_preferences(user_pref_result['raw_response']);
			    var t_file = require('fs').readFileSync('./public/themes/tranquility/views/dashboard.jade','utf8');
			    var j_funct = this_class.jade.compile(t_file, {filename:'',pretty: true});
			    var rendered_template = j_funct({'test':'test'});
			    this_class.socket.emit('login_success',{
				'status':true,
				'status_message':'Login Successful.',
				'session_id':'not implemented',
				'username':user,
				'form_id':login_data['form_id'],
				'user_id':user_lookup_result['raw_response'][0]['user_id'],
				'page': rendered_template,
				'user_preferences':prefs
			    })
			}else{
			    this_class.emit_login_failure(login_data,'failed on preference read');
			}
		    })
		})
	    }else{
		this_class.emit_login_failure(login_data,'failed on login lookup');
	    }
	})
    }
}
module.exports.account_controller = account_controller;