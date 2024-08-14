import { BrowserName, StorageKey } from '~constants';
import { storage } from '~data/storage';

class BrowserService {
    storage: typeof storage;
    storageKey = StorageKey.BROWSER_NAME;

    constructor(storageArg: typeof storage) {
        this.storage = storageArg;
    }

    async storeBrowserName() {
        // We need this timeout to wait for css variables to be loaded.
        // The number is chosen arbitrarily.
        setTimeout(
            async () =>
                await this.storage.set(this.storageKey, this.getBrowsertName()),
            1000,
        );
    }

    async getBrowserName(): Promise<BrowserName | undefined> {
        return await this.storage.get(this.storageKey);
    }

    private getBrowsertName(): BrowserName {
        if (!navigator || !navigator.userAgent || !document || !window) {
            console.error(
                'This function should be called in browser content environment.',
            );

            return BrowserName.Unknown;
        }

        const userAgent = navigator.userAgent;
        let browserName = BrowserName.Unknown;

        if (
            !!getComputedStyle(document.documentElement).getPropertyValue(
                '--arc-palette-title',
            )
        ) {
            browserName = BrowserName.Arc;
        } else if (userAgent.indexOf('Firefox') > -1) {
            browserName = BrowserName.Firefox;
        } else if (
            userAgent.indexOf('Opera') > -1 ||
            userAgent.indexOf('OPR') > -1
        ) {
            browserName = BrowserName.Opera;
        } else if (userAgent.indexOf('Trident') > -1) {
            browserName = BrowserName.InternetExplorer;
        } else if (userAgent.indexOf('Edge') > -1) {
            browserName = BrowserName.Edge;
        } else if (userAgent.indexOf('Chrome') > -1) {
            browserName = BrowserName.Chrome;
        } else if (userAgent.indexOf('Safari') > -1) {
            browserName = BrowserName.Safari;
        }

        return browserName;
    }
}

export default new BrowserService(storage);
