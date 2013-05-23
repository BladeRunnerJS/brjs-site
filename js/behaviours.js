$('a').click(function() {
    var destHref = $( this ).attr( 'href' ).replace( '#', '' );
    var destination = $( 'a[name=' + destHref + ']' ).offset().top - 130; // TODO: -130 should be calculated
    $( 'html:not(:animated),body:not(:animated)' ).animate( { scrollTop: destination }, 500 );
    return false;
});