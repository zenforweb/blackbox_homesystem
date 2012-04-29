function Dashboard(socket,utilities){
    this.socket = socket;
    this.utilities = utilities;
    this_class = this;
    /*this_class.tabs['Settings']*/
    $('#dashboard_link').live('click', function(ev){
        ev.preventDefault();
        active_panel = $('.active_panel')
        active_panel.animate({
            opacity: 1,
            top: '+=-500'            
        }, 500,function(){
            console.log('before removeAttr')
            console.log(active_panel)
            active_panel.removeAttr('style').addClass('ready_animate').removeClass('active_panel');
        })
        $('#page_dashboard').animate({
            opacity: 1,
            top: '+=-1000'
        }, 500).removeClass('ready_animate').addClass('active_panel');
    });
    $('#settings_link').live('click',function(ev){
        ev.preventDefault();
        console.log(  );
        if( $('#page_settings').length == '' ){
            this_class.socket.emit('get_settings',{'test':'test2'})
            this_class.socket.on('settings_loaded',function(settings_data){
                var active_panel = $('.active_panel');
                active_panel.animate({
                    opacity: 0.0,
                    top: '+=-500'
                    }, 500, function(){
                        active_panel.removeClass('active_panel').addClass('ready_animate').removeAttr('style');
                        $('#viewport').append( settings_data['page'] ).animate({
                            opacity: 1,
                        }, 500);
                        $('#page_settings').addClass('active_panel').removeAttr('style');
                    }
                );
            });
        } else {
            active_panel = $('.active_panel')
            active_panel.animate({
                opacity: 1,
                top: '+=-500'            
            }, 500, function(){
                active_panel.removeClass('active_panel').addClass('ready_animate').removeAttr('style');
            })
            $('#page_settings').animate({
                opacity: 1,
                top: '+=-1000'
            }, 500).removeClass('ready_animate').addClass('active_panel');            
        }
    });
};