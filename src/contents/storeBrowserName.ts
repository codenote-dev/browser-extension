import type { PlasmoCSConfig } from 'plasmo';

import BrowserService from '~data/services/BrowserService';

export const config: PlasmoCSConfig = {
    matches: [
        'https://github.com/*/*/blob/*',
        'https://www.github.com/*/*/blob/*',
    ],
};

window.onload = () => BrowserService.storeBrowserName();
