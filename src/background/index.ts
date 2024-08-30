import {
    openSidePanel,
    toggleSidePanel,
} from '~data/services/SidePanelService';

const ORIGIN = 'https://github.com';

chrome.runtime.onMessage.addListener((message) => {
    // The callback for runtime.onMessage must return falsy if we're not sending a response
    if (message.type === 'open_side_panel') {
        // chrome.windows.getCurrent((currentWindow) => {
        //     chrome.sidePanel.open({ windowId: currentWindow.id });
        // });

        openSidePanel();
    }
});

// chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error(error));

chrome.action.onClicked.addListener(() => toggleSidePanel());
