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
    html = html.replace(/^.*<span class="comment">&lt;!-- New code --&gt;<\/span>.*\n(\s*?)/gmi, '<div class="new-code html">$1' );
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
      var downloadAsset = latest.assets[ 0 ];
      // Example download URL. Not sure how to get this via the releases API so
      // so hard-coding for now.
      // https://github.com/BladeRunnerJS/brjs/releases/download/v0.7/BladeRunnerJS-v0.7-0-gff6e9cb.zip
      $( 'a.brjs-latest-download' )
        .attr( 'href', 'https://github.com/BladeRunnerJS/brjs/releases/download/' +
                       latest.tag_name + '/' +
                       downloadAsset.name )
        .attr( 'aria-label', bytesToMB( downloadAsset.size ) )
        .find( '.brjs-latest-version' ).text( 'BRJS ' + latest.tag_name );
    } );
  }

  function bytesToMB( str ) {
    var bytes = Number( str );
    return (bytes / ( 1024 * 1024 ) ).toFixed( 2 ) + ' MB';
  }

  function findLatestBRJSRelease( data ) {
    return data[ 0 ];
  }

  updateBRJSDownloadLinks();

  // ToC
  function generateToC() {
    var pageToc = $( '#page_toc' );
    // only supply an pageToc element if just one has been specified
    pageToc = ( pageToc.size() === 1? pageToc : null );
    $('body.docs .main').toc( {
      startAt: 2,
      allowHide: false,
      pageToc: pageToc
    } );
  }

  generateToC();

} );
