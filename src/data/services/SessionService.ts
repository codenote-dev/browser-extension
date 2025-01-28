import { StorageKey } from '~constants';
import { storage } from '~data/storage';

type SessionData = {
    session_id: string;
    timestamp: number;
};

const SESSION_EXPIRATION_IN_MIN = 30;

export const getOrCreateSession = async () => {
    let sessionData: SessionData | undefined = await storage.get(
        StorageKey.SESSION,
    );

    const currentTimeInMs = Date.now();
    // Check if session exists and is still valid
    if (sessionData && sessionData.timestamp) {
        // Calculate how long ago the session was last updated
        const durationInMin = (currentTimeInMs - sessionData.timestamp) / 60000;
        // Check if last update lays past the session expiration threshold
        if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
            // Clear old session id to start a new session
            sessionData = undefined;
        } else {
            // Update timestamp to keep session alive
            sessionData.timestamp = currentTimeInMs;
            await storage.set(StorageKey.SESSION, { sessionData });
        }
    }

    if (!sessionData) {
        // Create and store a new session
        sessionData = {
            session_id: currentTimeInMs.toString(),
            timestamp: currentTimeInMs,
        };
        await chrome.storage.session.set({ sessionData });
    }

    return sessionData.session_id;
};
