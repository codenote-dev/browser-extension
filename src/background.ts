const ORIGIN = 'https://github.com';

chrome.runtime.onMessage.addListener((message) => {
    // The callback for runtime.onMessage must return falsy if we're not sending a response
    if (message.type === 'open_side_panel') {
        chrome.windows.getCurrent((currentWindow) => {
            chrome.sidePanel.open({
                windowId: currentWindow.id,
            });
        });
    }
});

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
