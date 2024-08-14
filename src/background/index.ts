// import { BrowserName } from '~constants';
// import BrowserService from '~data/services/BrowserService';

import { storage } from '~data/storage';

const ORIGIN = 'https://github.com';

chrome.runtime.onMessage.addListener((message) => {
    // https://stackoverflow.com/questions/77213045/error-sidepanel-open-may-only-be-called-in-response-to-a-user-gesture-re
    // const browserName = await BrowserService.getBrowserName()

    // The callback for runtime.onMessage must return falsy if we're not sending a response
    if (message.type === 'open_side_panel') {
        // if (browserName === BrowserName.Arc) {
        //     chrome.tabs.create({
        //         active: true,
        //         url: 'sidepanel.html',
        //     });
        // } else {
        chrome.windows.getCurrent((currentWindow) => {
            chrome.sidePanel.open({ windowId: currentWindow.id });
        });
        // }
    }
});

// chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error(error));

chrome.action.onClicked.addListener((tab) => {
    // chrome.scripting.executeScript({
    //     target: {tabId: tab.id},
    //     files: ['contentScript.js']
    // });
    storage.get('SIDE_DRAWER_OPEN').then((value) => {
        storage.set('SIDE_DRAWER_OPEN', !value);
    });
    console.log(tab);
});
