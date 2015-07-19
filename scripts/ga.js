(function(window, document, ga, script) {
  window.GoogleAnalyticsObject = ga;
  window[ga] || (window[ga] = function() {
    (window[ga].q = window[ga].q || []).push(arguments);
  });
  window[ga].l = Date.now;
  script = document.createElement("script");
  script.src = "//www.google-analytics.com/analytics.js";
  document.head.appendChild(script);
}(window, document, "ga"));
ga("create","UA-48103481-1","readtheblackswan.lu");
ga("send","pageview");