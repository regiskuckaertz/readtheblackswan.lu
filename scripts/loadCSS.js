(function(document, script0) {
  /*!
  loadCSS: load a CSS file asynchronously.
  [c]2014 @scottjehl, Filament Group, Inc.
  Licensed MIT
  */
  function loadCSS( href ){
  	"use strict";
  	var ss = document.createElement( "link" );
  	ss.rel = "stylesheet";
  	ss.href = href;
  	// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
  	ss.media = "only x";
  	// inject link
  	script0.parentNode.insertBefore( ss, script0 );
  	// set media back to `all` so that the styleshet applies once it loads
  	setTimeout( function(){
  		ss.media = "all";
  	} );
  	return ss;
  }
  global.loadCSS = loadCSS;
}(document, document.scripts[0]));