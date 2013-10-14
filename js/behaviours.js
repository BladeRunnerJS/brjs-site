$( function() {
	var url = document.location.pathname;
	var links = $( 'a[href="' + url + '"]' );

  var parent;
	links.each( function( i, el ) {
    el = $( el );
    parent = el.parent();
    var parentTagName = parent.get( 0 ).tagName.toLowerCase();
    if( parentTagName === 'li' ||
        /h[12345]/.test( parentTagName ) ) {
      parent.addClass( 'active' );
    }
  } );

	$( 'pre code' ).each( function( i, el ) {
    el = $( el );
    
    var code = $.trim( el.text() );
    var lang = 'javascript';
    if( code.indexOf( '$' ) === 0 ) {
      lang = 'bash';
    }
    else if ( code.indexOf( '<' ) === 0 ) {
      lang = 'xml';
    }

    var result = hljs.highlight( lang, el.text() );
    el.html( result.value );
  } );

} );