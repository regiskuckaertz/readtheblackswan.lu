/*!
loadCSS: load a CSS file asynchronously.
[c]2014 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
function loadCSS( href ){
	"use strict";
	var ss = window.document.createElement( "link" );
	var ref = document.scripts[0];
	ss.rel = "stylesheet";
	ss.href = href;
	// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
	ss.media = "only x";
	// inject link
	ref.parentNode.insertBefore( ss, ref );
	// set media back to `all` so that the styleshet applies once it loads
	setTimeout( function(){
		ss.media = "all";
	} );
	return ss;
 }
