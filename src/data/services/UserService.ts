import { StorageKey } from '~constants';
import { storage } from '~data/storage';

export const getOrCreateUserId = async () => {
    let userId = await storage.get(StorageKey.USER_ID);

    if (!userId) {
        // Generate a unique client ID, the actual value is not relevant
        userId = self.crypto.randomUUID();
        await storage.set(StorageKey.USER_ID, userId);
    }

    return userId;
};
