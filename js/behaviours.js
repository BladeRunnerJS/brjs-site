( function( $ ) {
	
	var win = $( window );
	var navbar = $( '.navbar-fixed-top' );
	var brand = $( '.brand' );
	var visibleHeight = navbar.height();
	var hideNavbarScroll = visibleHeight;
	var brandVisible = true;

	win.scroll( function( ev ) {
		if( brandVisible === true && win.scrollTop() >= hideNavbarScroll ) {
			brandVisible = false;
			brand.fadeIn();
		}
		else if( brandVisible === false && win.scrollTop() < hideNavbarScroll ) {
			brandVisible = true;
			brand.fadeOut();
		}
	} );


} )( jQuery );