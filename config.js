/*CHRIS*/
exports.config = {
  'app_port':3737,
  'db_host':'localhost',
  'db_user':'root',
  'db_pass':'cleancut',
  'db_port':'3306',
  'db_pool_size':'20'
}
/*  NOTE:
/* TO AVOID THE REDUNDANT config['config'] in the config['config']['app_port'] CALL (AND DB CONTROLLER INSTANTIATION), WE COULD DO:
  exports.app_settings = {'
    port':3737
  }
  exports.db_settings = {
    'host':'localhost',
    'user':'root',
    etc..
    etc..
  }
  
  WOULD REQUIRE CHANGING HOW DB SETTINGS ARE REFERENCED IN DBASE CLASS INSTANTIATION
    INSTEAD OF config['config']['db_user'], would become config['db_settings']['user']
  WOULD REQUIRE CHANGING HOW PORT IS CALLED FOR APP.
    INSTEAD OF config['config']['app_port'], would become config['app_settings']['port']
*/

/* ALIX
exports.config = {
  'app_port':3737,
  'db_host':'localhost',
  'db_user':'root',
  'db_pass':'cleancut',
  'db_port':'3306',
  'db_pool_size':'20'
}
*/

