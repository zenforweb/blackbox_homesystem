$(document).ready(function(){

	var base_url = '10.1.10.80:3636';

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
		}
		else { return true; }
	}
 
	function login( form ){
		if ( form_validate( form ) ){
			form.hide('1000', function(){ loading.show(); });
		    var username  	= $('[name="username"]').val(),
		    	pass		= $('[name="password"]').val(),
		    	updateUrl 	= base_url + '/account/login/' + username + '/' + pass + '/';
		    console.log( updateUrl );
	        $.ajax({
	            url: updateUrl,
	            context: document.body,
	            success: function(){ console.log( 'sent update!' ); }
	        });				
		}
	}

});