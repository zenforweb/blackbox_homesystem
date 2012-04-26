function Dashboard(socket,utilities){
    this.socket = socket;
    this.utilities = utilities;
    this_class = this;
    /*this_class.tabs['Settings']*/
    $('#settings_link').live('click',function(ev){
        console.log('before prevent default')
	ev.preventDefault();
        this_class.socket.emit('get_settings',{'test':'test2'})
    })

    /*    var edit_btn        = $(this),
        table               = edit_btn.closest('table'),
        placeholder = table.find('.auto-submit-off'),
        input               = table.find('.auto-submit');
	if( input.hasClass('hide') ){
            input.removeClass('hide');
	    placeholder.addClass('hide');
	} else {
	    placeholder.each( function(){
                var form_element    = $(this).closest('td').find('.auto-submit'),
                this_input_val      = form_element.val();
                if( this_input_val != ''){ $(this).text( this_input_val ); }
	    });
            input.addClass('hide');
            placeholder.removeClass('hide');
        }	
    })
    */
};