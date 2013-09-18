$( function() {
	var url = document.location.pathname;
	var links = $( 'a[href="' + url + '"]' );
	links.addClass( 'active' );
} );