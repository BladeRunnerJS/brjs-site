$('a').click(function() {
    var destHref = $( this ).attr( 'href' ).replace( '#', '' );
    var destination = $( 'a[name=' + destHref + ']' ).offset().top - 150; // TODO: -150 should be calculated
    $( 'html:not(:animated),body:not(:animated)' ).animate( { scrollTop: destination }, 500 );
    return false;
});