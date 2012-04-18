$(document).ready(function(){
	var the_iPad 	= navigator.userAgent.match(/iPad/i) != null,
		the_iPhone 	= navigator.userAgent.match(/iPhone/i) != null,
		the_Android = navigator.userAgent.match(/Android/i) != null;
	if( the_iPad ){ var browser = 'iPad'; }
	else if( the_iPhone ) { var browser = 'iPhone'; }
	else if( the_Android ) { var browser = 'android'; }
	else { var browser = 'desktop' }
	$('body').attr( 'id', browser );
});