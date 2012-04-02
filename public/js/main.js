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
		socket.emit('login_attempt', {
		    'username':$('[name="username"]').val(),
		    'pass':$.md5($('[name="password"]').val()),
		    'form_id': form.attr('id')
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
		$(this).css('display','none')
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