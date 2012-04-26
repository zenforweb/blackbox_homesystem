$(document).ready(function(){
    // load socket.io -> start web socket communication
    $.getScript('/socket.io/socket.io.js', function(){
		$.getScript('/themes/tranquility/js/utilities.js', function(){
	    	var socket = io.connect();
		    var utilities = new Utilities(socket);
		    var Account_Manager;
		    var Dashboard_Manager;
		    
		    // load account class
		    $.getScript('/themes/tranquility/js/account.js', function(){
				Account_Manager = new Account(socket,utilities)
		    })
		    // load dashbaord class to deal with tab transitions
		    $.getScript('/themes/tranquility/js/dashboard.js', function(){
		    	console.log('in dashboard creation')
				// var tab_associations = {}
				// tab_associations['Settings']
			 //    	"Settings":"#settings_link",
			 //    	"Other Tab":".other_tab_class",
			 //    	"Other Tab 2":"other_tab_2_class"
				// }
				Dashboard_Manager = new Dashboard(socket,utilities)
		    })
		    $('form').submit( function(ev){
				ev.preventDefault();
				var form    = $(this),
				form_id 	= form.attr('id'),
				input_value	= form.find('input').val(),
				loading = $('#loading');
				if( form_id = 'form_login' ){
			    	Account_Manager.login_attempt( form )
				} else { }
		    });
		})
    })
});