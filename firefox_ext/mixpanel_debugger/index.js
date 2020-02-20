/**
This script is run whenever the devtools are open.
In here, we can create our panel.
**/


function initialisePanel() {
    console.log("panel is being shown");
}

function unInitialisePanel() {
    console.log("panel is being hidden");
}

browser.devtools.panels.create(
    "Mixpanel Log",                      // title
    "icons/icon-blue.png",                // icon
    "devtools/devtools-page.html"      // content
).then((newPanel) => {
    newPanel.onShown.addListener(initialisePanel);
    newPanel.onHidden.addListener(unInitialisePanel);
});