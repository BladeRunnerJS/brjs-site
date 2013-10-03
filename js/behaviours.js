$( function() {
	var url = document.location.pathname;
	var links = $( 'a[href="' + url + '"]' );

  var parent;
	links.each( function( i, el ) {
    el = $( el );
    parent = el.parent();
    if( parent.get( 0 ).tagName.toLowerCase() === 'li' ) {
      parent.addClass( 'active' );
    }
  } );

	hljs.initHighlightingOnLoad();
} );