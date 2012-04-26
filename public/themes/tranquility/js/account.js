function Account(socket,utilities){
    this.socket = socket;
    this.utilities = utilities;
    this_class = this;
    this_class.login_attempt = function(form){
	if (this.utilities.validate_form(form)){
	    this_class.socket.emit('login_attempt',{
		'username':$('[name="username"]').val(),
		'pass':$.md5($('[name="password"]').val()),
		'form_id': form.attr('id'),
	    })
	}
    }
    this_class.socket.on('login_success',function(page){
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
    this_class.socket.on('login_failure',function(page){
        var form = $('#'+page['form_id']);
        loading.hide();
        form.show('1000',function(){loading.hide()});
        form.effect("shake", { times:3 }, 100);
    })

};