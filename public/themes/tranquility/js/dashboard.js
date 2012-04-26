function Dashboard(socket,utilities,tab_associations){
    this.socket = socket;
    this.tabs = tab_associations;
    this.utilities = utilities;
    this_class = this;
    $(this_class.tabs['Settings']).live('click',function(ev){
	ev.preventDefault();
        var edit_btn        = $(this),
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
};