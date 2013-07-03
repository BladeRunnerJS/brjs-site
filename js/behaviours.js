( function( $ ) {
	
	var win = $( window );
	var navbar = $( '.navbar-fixed-top' );
	var brand = $( '.brand' );
	var visibleHeight = navbar.height();
	var hideNavbarScroll = visibleHeight;
	var shown = true;

	win.scroll( function( ev ) {
		if( shown === true && win.scrollTop() >= hideNavbarScroll ) {
			shown = false;
			animate( 0 );
		}
		else if( shown === false && win.scrollTop() < hideNavbarScroll ) {
			shown = true;
			animate( visibleHeight );
		}
	} );

	function animate( height ) {
		brand.animate( { top: height + 'px' } );
	}

} )( jQuery );