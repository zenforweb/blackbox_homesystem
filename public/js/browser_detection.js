console.log( 'loaded browser detection' );
var the_iPad 	= navigator.userAgent.match(/iPad/i) != null,
	the_iPhone 	= navigator.userAgent.match(/iPhone/i) != null,
	the_Android = navigator.userAgent.match(/Android/i) != null;