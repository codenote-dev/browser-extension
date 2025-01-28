import { GITHUB_ONBOARDING_URL } from '~constants';
import { handleAnalyticsEvent } from '~data/services/AnalyticsService';
import { startOnboarding } from '~data/services/OnboardingService';
import {
    openSidePanel,
    toggleSidePanel,
} from '~data/services/SidePanelService';

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: GITHUB_ONBOARDING_URL,
        });
        startOnboarding();
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'open_side_panel') {
        openSidePanel();
    }
});

// Analytics events
chrome.runtime.onMessage.addListener(handleAnalyticsEvent);

chrome.action.onClicked.addListener(() => toggleSidePanel());
