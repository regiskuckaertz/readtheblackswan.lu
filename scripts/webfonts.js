(function() {
  try {
    if (localStorage.webfonts) {
      // The font is in localStorage, we can load it directly
      localStorage.removeItem('webfonts');
    }
} catch(ex) { /* */ }
}());
