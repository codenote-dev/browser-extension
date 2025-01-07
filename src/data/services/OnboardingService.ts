import { StorageKey } from '~constants';
import { storage } from '~data/storage';

export const startOnboarding = async () =>
    await storage.set(StorageKey.IS_ONBOARDING, true);

export const isOnboarding = async () =>
    await storage.get(StorageKey.IS_ONBOARDING);

export const finishOnboarding = async () =>
    await storage.set(StorageKey.IS_ONBOARDING, false);
