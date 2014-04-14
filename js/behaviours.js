$( function() {

  // Add active class that refer to current page
  function decorateActiveLinks() {
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
  }

  // Hightlight code
  function highlightCode() {
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
      var html = boldNewCode( result.value );
      el.html( html );
    } );
  }

  // Bold code that is flagged as new
  // New code is indicated as follows:
  //
  // JavaScript
  //  /*** New code ***/
  //  the new code
  //  /*** End of new code ***/
  //
  // HTML:
  //  <!-- New code -->
  //  the new HTML
  // <!-- End of new code -->
  function boldNewCode( html ) {
    // JavaScript
    html = html.replace(/^.*<span class="comment">\/\*{3} New code \*{3}\/<\/span>.*\n(\s*?)/gmi, '<div class="new-code js">$1' );
    html = html.replace(/\s+<span class="comment">\/\*{3} End of new code \*{3}\/<\/span>\n/gmi, '</div>' );

    // HTML
    html = html.replace(/^.*<span class="comment">&lt;!-- New code --&gt;<\/span>.*\n(\s+)/gmi, '<div class="new-code html">$1' );
    html = html.replace(/\s+<span class="comment">&lt;!-- End of new code --&gt;<\/span>\n/gmi, '</div>' );

    return html;
  }

  decorateActiveLinks();
  highlightCode();

  // Download latest BRJS links
  function updateBRJSDownloadLinks() {
    var githubReleaseUrl = 'https://api.github.com/repos/bladerunnerjs/brjs/releases';
    $.get( githubReleaseUrl, function( data ) {
      var latest = findLatestBRJSRelease( data );
      $( 'a.brjs-latest-download' ).attr( 'href', latest );
    } );
  }

  function findLatestBRJSRelease( data ) {
    return data[ 0 ].zipball_url;
  }

  updateBRJSDownloadLinks();


} );
