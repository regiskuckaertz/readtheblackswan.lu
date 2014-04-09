(function( window, document, wfl) {
  function onActive() {}
  
  function loadJS( src, callback ) {
    var script = document.createElement("script");
    script.src = src;
    callback && (script.onload = function() {
       callback();
    });
    
    document.head.appendChild( script );
  }
        
  window.WebFontConfig = {
    custom: {
      families: ["Auto:i3"],
      urls: ["/webfonts.css"]
    },
    timeout: 3000,
    active: onActive
  };

  if ( "classList" in document.documentElement
      && "localStorage" in window
      && "addEventListener" in window ) {
    if( document.readyState === "complete" ) {
      loadJS(wfl);
    } else { 
      window.onload = function(){ 
        loadJS(wfl);
      }
    }
  };
}( window, document, "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js" ));

(function( window, document, globalName, script ) {
  window['GoogleAnalyticsObject'] = globalName;
  window[globalName] || (window[globalName] = function() {
    ( window[globalName].q = window[globalName].q || [] ).push( arguments );
  });
  window[globalName].l = +new Date();
  script = document.createElement('script'),
  script.src = '//www.google-analytics.com/analytics.js';
  document.head.appendChild( script );
})( window, document, 'ga' );

ga('create', 'UA-48103481-1', 'readtheblackswan.lu');
ga('send', 'pageview');
