$(document).ready(function(){
	$('#next').live('click', function(){
		var btn 	= $(this),
			btnval	= btn.val(),
			option 	= btn.closest('.options');
		option.fadeTo('slow', 0.00, function(){
			$(option).slideUp('slow', function(){
				$( '#'+btnval ).fadeIn(500);
			});
		});
	});
	$('input').focus(function(){
		var input = $(this);
		$('input').each(function(){ $(this).removeClass('active').addClass('normal'); });
		input.removeClass('normal').addClass('active');
	});
});