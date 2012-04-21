function Settings(){
    this.submit_class = 'auto-submit',
    this.change_handler = function(ev){
    	console.log( ev.attr('name') );
    	console.log( ev.val() );
    }
};