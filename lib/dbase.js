function Dbase_controller(host,port,user,pass,conn_limit){
    this.mysql_obj = require('mysql');
    this.result_obj = require('./db_result');
    this.host = host;
    this.port = port;
    this.user = user;
    this.pass = pass;
    this.conn_limit = conn_limit;
    this.connection_pool = [];
    this.query_result_holder = {};
    this.re_usable_ids = [];
    this.unique_connection_id = 0;
};
Dbase_controller.prototype = {
    create_connection_pool: function(){
	for (var i=0;i<this.conn_limit;i++){
	    new_connection = this.aquire_connection_identity();
	    new_connection['connection'] = this.mysql_obj.createClient({'host':this.host,'port':this.port,'user':this.user,'password':this.pass});
	    new_connection['in_use'] = 0;
	    this.connection_pool.push(new_connection)
	}
    },
    aquire_connection_identity: function(){
	var new_conn_info = {};
	if (this.re_usable_ids.length > 0){
	    new_conn_info['id'] = this.re_usable_ids.splice(0,1);
	}else{
	    new_conn_info['id'] = this.unique_connection_id;
	    this.unique_connection_id += 1;
	}
	return new_conn_info;
    },
    get_connection: function(){
	var a = 0;
	while (a < 1){
	    if(this.connection_pool.length > 0){
		for(var i=0; i<this.connection_pool.length;i++){
		    if (this.connection_pool[i]['in_use'] == 0){
			this.connection_pool[i]['in_use'] = 1;
			a+=1;
			return this.connection_pool[i];
		    }
		}
	    }else{
		console.log('no connections in pool')
		return false;
	    }
	}
    },
    query: function(sql,cb){
	conn = this.get_connection();
	if (conn!=false){
	    conn['connection'].query(sql,function(error,results,fields){
		if (error) {
		    console.log('GetData Error: ' + error.message);
		    return false;
		}
		if(results.length > 0){
		    res_obj = require('./db_result.js');
		    resp = new res_obj.Db_result(results);
		    cb(resp);
		    conn['in_use'] = 0;
		    return true;
		}else{
		    console.log('no results');
		    res_obj = require('./db_result.js');
		    resp = new res_obj.Db_result(results);
		    cb(resp);
		    conn['in_use'] = 0;
		    return true;
		}
	    });
	    return true
	}else{
	    console.log('no connection');
	    return false;
	}
    }
};
module.exports.Dbase_controller = Dbase_controller;