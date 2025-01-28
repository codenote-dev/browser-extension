import { sendEventToGA } from '~data/providers/GoogleAnalyticsProvider';
import { getOrCreateSession } from '~data/services/SessionService';
import { getOrCreateUserId } from '~data/services/UserService';

type AnalyticsEvent = {
    type: 'analytics';
    name: string;
    params: Record<string, any>;
};

export const sendAnalyticsEvent = async (
    name: string,
    params?: Record<string, any>,
) => {
    return await chrome.runtime.sendMessage({
        type: 'analytics',
        name,
        params,
    });
};

export const handleAnalyticsEvent = async (message: AnalyticsEvent) => {
    if (message.type !== 'analytics') {
        return;
    }

    const eventName = message.name;
    const userId = await getOrCreateUserId();
    const session = await getOrCreateSession();

    return await sendEventToGA(eventName, userId, {
        session_id: session,
        ...(message.params || {}),
    });
};
