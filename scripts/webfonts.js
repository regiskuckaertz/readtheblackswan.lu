(function(window, document){
	var root = document.documentElement

	if( ! ( 'classList' in root ) ) return;

	root.className += ' wf-loading'

	function addFont() {
    var style = document.createElement('style'),
    	target = document.scripts[0]
    style.rel = 'stylesheet'
    style.textContent = localStorage.webfonts
    target.parentNode.insertBefore(style, target)
    root.classList.add('wf-active')
    root.classList.remove('wf-loading')
  }

  try {
    if (localStorage.webfonts) {
      // The font is in localStorage, we can load it directly
      addFont()
    } else {
  		var supportsWoff2 = (function(){
  			if( !( 'FontFace' in window ) ) {
  				return false
  			}

  			var f = new window.FontFace( 't', 'url( "data:application/font-woff2," ) format( "woff2" )' )
  			f.load()

  			return f.status === 'loading'
  		})()

      var fontFile = '/styles/webfonts.woff.min.css'

      if( supportsWoff2 ) {
			  fontFile = '/styles/webfonts.woff2.min.css'
      }

      // We have to first load the font file asynchronously
      var request = new XMLHttpRequest()
      request.open('GET', fontFile, true)
      request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
              // We save the file in localStorage
              localStorage.webfonts = request.responseText

              // ... and load the font
              addFont()
          }
      }

      request.send();
    }
  } catch(ex) {
    // maybe load the font synchronously for woff-capable browsers
    // to avoid blinking on every request when localStorage is not available
    root.classList.remove('wf-loading')
    root.classList.add('wf-active')
  }
}(window, document));
