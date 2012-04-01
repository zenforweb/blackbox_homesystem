$(document).ready(function(){
    $.getScript('/socket.io/socket.io.js', function(){
	var socket = io.connect()
	$('form').submit( function(ev){
	    ev.preventDefault();
	    var form    	= $(this),
	    form_id 	= form.attr('id'),
	    input_value	= form.find('input').val()
	    loading = $('#loading');
	    if( form_id = 'form_login' ){
		login( form );
	    } else { }
	});
	function form_validate( form ){
	    var input 		= form.find('input'),
	    input_count = input.length,
	    error_code  = 0;
	    $.each( input, function(){
		if( $(this).val() == '' ){ error_code++; }
	    });
	    if( error_code ){ 
		$(form).effect("shake", { times:2 }, 100);
		return false;	
	    }else{ 
		return true; 
	    }
	}
	function login( form ){
	    if ( form_validate( form )){
		form.hide('1000', function(){ loading.show()});
		var username = $('[name="username"]').val();
		var pass = $.md5($('[name="password"]').val());
		socket.emit('login_attempt', {'username':username,'pass':pass});
	    }
	}
	socket.on('login_success',function(page){
	    console.log('success')
	    console.log(page)
	})
	socket.on('login_failure',function(page){
	    console.log('fail')
	    console.log(page)
	})
    })
});