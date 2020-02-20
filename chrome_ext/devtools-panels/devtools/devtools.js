chrome.devtools.panels.create("Mixpanel Log",
  "/icons/star.png",
  "/devtools/panel/panel.html",
  function(newPanel) {
    newPanel.onShown.addListener(function() {
    	console.log('hi esa')}
  	);
  }
);
