function Dashboard(socket,utilities){
    this.socket = socket;
    this.utilities = utilities;
    $.getScript('/themes/tranquility/js/settings.js', function(){
	this.settings_controller = new Settings_Controller(socket,utilities)
    })
    this.settings_controller
    this_class = this;
    /*this_class.tabs['Settings']*/
    $('#nav ul li a').live('click', function(ev){
        ev.preventDefault();
        var nav_button = $(this),
            link_id = nav_button.attr('id');
        if( nav_button.hasClass('deadButton') ){ return; }
        if( link_id == 'dashboard_link' ){
            var page_to_load = 'page_dashboard';
            viewport_move( $('#page_dashboard') );
        } else if( link_id == 'settings_link' ){
            var page_to_load = 'page_settings'
            ev.preventDefault();
            if( $('#page_settings').length == '' ){
                this_class.socket.emit('get_settings',{'test':'test2'})
                this_class.socket.on('settings_loaded',function(settings_data){
                    $('#viewport').append( settings_data['page'] );
                    $('#page_settings').addClass('ready_animate');
                    viewport_move( $('#page_settings') );
                });
            } else { viewport_move( $('#page_settings') ); }
        }
        update_nav( nav_button );
    });

    function update_nav( button ){
        $('#nav').find('a').removeClass('deadButton');
        button.addClass('deadButton');
    }
    function viewport_move( new_active_panel ){
        var current_active_panel = $('.active_panel');
        current_active_panel.animate({
            opacity: 0,
            top: '+=-300'
        }, 400, function(){
            current_active_panel.removeClass('active_panel').addClass('ready_animate').removeAttr('style');
        })
        new_active_panel.animate({
            opacity: 1,
            top: '+=-1000'
        }, 600);
        new_active_panel.removeClass('ready_animate').addClass('active_panel');            
    }
};