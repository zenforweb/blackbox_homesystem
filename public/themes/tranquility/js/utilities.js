function Utilities(socket){
    this.socket = socket;
    this.validate_form = function(form){
        var input = form.find('input'),
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
    this_class = this;
};