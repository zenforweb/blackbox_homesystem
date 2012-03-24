function Db_result(mysql_query_response){
    this.raw_response = mysql_query_response;
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