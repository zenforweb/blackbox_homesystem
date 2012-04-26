$(document).ready(function(){
	$.getScript('/socket.io/socket.io.js', function(){
		$('.settings-edit').live('click', function(){
			var edit_btn	= $(this),
				table 		= edit_btn.closest('table'),
				placeholder = table.find('.auto-submit-off'),
				input 		= table.find('.auto-submit');
			if( input.hasClass('hide') ){
				input.removeClass('hide');
				placeholder.addClass('hide');
			} else {
				placeholder.each( function(){
					var form_element	= $(this).closest('td').find('.auto-submit'),
						this_input_val 	= form_element.val();
					if( this_input_val != ''){ $(this).text( this_input_val ); }
				});
				input.addClass('hide');
				placeholder.removeClass('hide');
			}
		});
    	var socket = io.connect();
    	$.getScript('/themes/tranquility/js/settings.js',function(){
    		var settings = new Settings();
    		$('.'+settings['submit_class']).live('change',function(){			
    			settings.change_handler( $(this) );
    		});
    		//console.log(settings.change_handler)
    	});
    	/*
    	var settings = new settings_file.Settings();
		console.log(settings)
		$(settings.submit_class).live('change',settings.change_handler)
		*/
		$('form').submit( function(ev){
		    ev.preventDefault();
		    var form    = $(this),
		    	form_id 	= form.attr('id'),
		    	input_value	= form.find('input').val(),
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
				socket.emit('login_attempt', {
				    'username':$('[name="username"]').val(),
				    'pass':$.md5($('[name="password"]').val()),
				    'form_id': form.attr('id'),
				    'user_socket': ''
				});
		    }
		}
		socket.on('login_success',function(page){
		    var success_page = $(page['page'])
		    success_page.animate({
				left: '+=1000'
		    })
		    success_page.appendTo('#wrap')
		    $.each($('.activated_panel'),function(){
				$(this).animate({
			    	left: '-=1000'
				})
				$(this).remove();
		    })
		    success_page.css('display', 'block');
		    success_page.animate({
				left: '-=1000'
		    })
		})
		socket.on('login_failure',function(page){
		    var form = $('#'+page['form_id']);
		    loading.hide();
		    form.show('1000',function(){loading.hide()});
		    form.effect("shake", { times:3 }, 100);	    
		})
    })
});