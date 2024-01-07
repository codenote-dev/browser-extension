const ORIGIN = 'https://github.com';

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;

    const url = new URL(tab.url);
    // Enables the side panel on google.com
    if (url.origin === ORIGIN) {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'sidepanel.html',
            enabled: true,
        });
    } else {
        // Disables the side panel on all other sites
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false,
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender) => {
    // The callback for runtime.onMessage must return falsy if we're not sending a response
    (async () => {
        if (message.type === 'open_side_panel') {
            // This will open a tab-specific side panel only on the current tab.
            await openSidePanel(sender.tab?.id);
        }
    })();
});

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

async function openSidePanel(tabId?: number) {
    await chrome.sidePanel.open({ tabId: tabId });
    await chrome.sidePanel.setOptions({
        tabId: tabId,
        path: 'sidepanel.html',
        enabled: true,
    });
}
