import {
    openSidePanel,
    toggleSidePanel,
} from '~data/services/SidePanelService';

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'open_side_panel') {
        openSidePanel();
    }
});

chrome.action.onClicked.addListener(() => toggleSidePanel());
