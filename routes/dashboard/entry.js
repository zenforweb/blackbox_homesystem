exports.dashboard = function(req, res){
  query_string = "SELECT * FROM logic_1.userSecure WHERE user='"+user+"' and pass='"+pass+"'";
  res.app.settings['db'].query(query_string, function(result_object){
    console.log(result_object);
    /*add whatever to do after query here..*/
    res.send(result_object)
  })
};
