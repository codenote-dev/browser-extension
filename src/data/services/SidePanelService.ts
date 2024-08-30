import { StorageKey } from '~constants';
import { storage, useStorage } from '~data/storage';

export const openSidePanel = async () => {
    await storage.set(StorageKey.SIDE_PANEL_STATE, true);
};

export const closeSidePanel = async () => {
    await storage.set(StorageKey.SIDE_PANEL_STATE, false);
};

export const toggleSidePanel = async (state?: boolean) => {
    if (state === undefined) {
        state = !(await storage.get(StorageKey.SIDE_PANEL_STATE));
    }

    await storage.set(StorageKey.SIDE_PANEL_STATE, state);
};

export function useSidePanelService(): [boolean, (state?: boolean) => void] {
    const [sidePanelState, setSidePanelState] = useStorage<boolean>(
        StorageKey.SIDE_PANEL_STATE,
    );

    return [
        sidePanelState || false,
        (state?: boolean) => {
            if (state === undefined) {
                state = !sidePanelState;
            }

            setSidePanelState(state);
        },
    ];
}
