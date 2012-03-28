$(document).ready(function(){

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
			if( $(this).val() == '' ){
				$(form).effect("shake", { times:3 }, 100);
				error_code++;
			}
		});
		if( error_code ){ return false;	} 
		else { return true; }
	}
 
	function login( form ){
		console.log( form_validate( form ) );
		if ( form_validate( form ) ){
			form.hide('1000', function(){
				loading.show();
			});
		}
	}
});