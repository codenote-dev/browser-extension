import { TourGuideClient } from '@sjmc11/tourguidejs';
import type { PlasmoCSConfig } from 'plasmo';

import { OnboardingEvent } from '~constants';
import {
    finishOnboarding,
    isOnboarding,
} from '~data/services/OnboardingService';
import { emulateClick, sendCustomDocumentEvent, sleep } from '~lib/utils';

export const config: PlasmoCSConfig = {
    matches: [
        'https://github.com/codenote-dev/browser-extension/blob/main/package.json', // GITHUB_ONBOARDING_URL
    ],
    css: [
        '../styles/onboarding.css',
        '../../node_modules/@sjmc11/tourguidejs/dist/css/tour.min.css',
    ],
};

const LINE_NUMBER_SELECTOR =
    '.react-code-file-contents > .react-line-numbers > [data-line-number="2"]';
const HIGHLIGHTED_LINE_MENU_BUTTON_SELECTOR =
    '#highlighted-line-menu-container > button';
const HIGHLIGHTED_LINE_MENU_FIRST_OPTION_SELECTOR =
    '.highlighted-line-menu-first-option';
const steps = [
    {
        title: 'Welcome to CodeNote!',
        content: `
            Hello!<br /><br />
            Welcome to CodeNote, a browser extension that helps you to leave notes on code snippets.<br /><br />
            To start using the extension, first we need to visit the Github repository.<br /><br />
            Let's view one of the file in the repository.<br /><br />
            Click <b>"Next"</b> to continue the onboarding tour.
        `,
        target: 'body',
    },
    {
        title: 'Get line menu',
        content: `
            When you click on the line number to highlight the code line you will see three dots access the menu to leave a note.<br /><br />
            <i>TIP: If you want to select multiple lines, hold "Shift" and click on the start and end line numbers you want to select.</i><br /><br />
            Click <b>"Next"</b> to continue the onboarding tour.
        `,
        target: LINE_NUMBER_SELECTOR,
        beforeLeave: async () => {
            await emulateClick(LINE_NUMBER_SELECTOR);
            await sleep(50);
        },
    },
    {
        title: 'Open line menu',
        content: `
            When you click on the three dots you will access the menu to leave a note.<br /><br />
            Click <b>"Next"</b> to continue the onboarding tour.
        `,
        target: HIGHLIGHTED_LINE_MENU_BUTTON_SELECTOR,
        beforeLeave: async () => {
            await emulateClick(HIGHLIGHTED_LINE_MENU_BUTTON_SELECTOR);
            sendCustomDocumentEvent(OnboardingEvent.GithubOpenLineMenu);
            await sleep(100);
        },
    },
    {
        title: 'Open the side panel',
        content: `
            When you click on <b>"Leave a note"</b> item in the menu.<br />
            It will open a side panel with the select code and a textarea to leave a note.<br /><br />
            <i>TIP: You can also use the codenote icon in browser toolbar to open the side panel.</i><br /><br />
            Click <b>"Next"</b> to continue the onboarding tour.
        `,
        target: HIGHLIGHTED_LINE_MENU_FIRST_OPTION_SELECTOR,
        beforeLeave: async () => {
            await emulateClick(HIGHLIGHTED_LINE_MENU_FIRST_OPTION_SELECTOR);
            sendCustomDocumentEvent(OnboardingEvent.GithubOpenSidebar);
        },
    },
    {
        title: 'Leave a note',
        content: `
            Now you can leave a useful note to better understand the code in the side panel.<br /><br />
            After you do that click on the <b>"Save"</b> button.<br /><br />
            It will save the note and you can see it later.<br /><br />
            <i>TIP: To close the side panel, click on <b>X</b>, or click outside of sidepanel, or click on the codenote icon in browser toolbar.</i><br /><br />
            I hope this tour was useful for you, enjoy using CodeNote!
        `,
        target: 'body',
    },
];

async function startOnboardingTour() {
    if (!(await isOnboarding())) {
        return;
    }

    const tg = new TourGuideClient({
        steps,
        targetPadding: 10,
        hidePrev: true,
        showStepProgress: false,
        exitOnClickOutside: false,
        dialogZ: 9999999999,
    });

    tg.start();
    tg.onFinish(() => finishOnboarding());
}

startOnboardingTour();
