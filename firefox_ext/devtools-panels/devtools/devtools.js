
browser.devtools.panels.create(
  "Mixpanel Log",
  "/icons/star.png",
  "/devtools/panel/panel.html"
).then((newPanel) => {
  newPanel.onShown.addListener(console.log('hi esa'));
  newPanel.onHidden.addListener();
}); 