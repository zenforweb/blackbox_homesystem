function Db_result(mysql_query_response){
    this.raw_response = mysql_query_response;
    if( this.raw_response.length > 0 ){
    	this.response_status = true;
    } else {
    	this.response_status = false;
    }
}
Db_result.prototype = {
    get_dictionary: function(){
	console.log('in get dictionary')
	t_dict = {};
	console.log(this.raw_response);
	return t_dict;
    }
}
module.exports.Db_result = Db_result;