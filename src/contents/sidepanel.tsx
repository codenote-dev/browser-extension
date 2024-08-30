import styleText from 'data-text:../style.css';
import React, { useEffect, useRef } from 'react';

import { useSidePanelService } from '~data/services/SidePanelService';
import { App } from '~ui/App';
import { Sheet, SheetPortal } from '~ui/shared/components/Sheet';

export const getStyle = () => {
    const style = document.createElement('style');
    style.textContent = styleText.replaceAll(':root', ':host(plasmo-csui)');
    return style;
};

export default () => {
    const container = useRef(null);
    const [sidePanelState] = useSidePanelService();

    useEffect(() => {
        document.body.style.overflow = sidePanelState ? 'hidden' : 'auto';
    }, [sidePanelState]);

    return (
        // Prevent keyboard actions on a page when the side panel is open
        <div onKeyDown={(e) => e.stopPropagation()}>
            <Sheet
                open={sidePanelState}
                // Remove overlay that prevents scrolling
                modal={false}>
                <SheetPortal container={container.current}>
                    <App />
                </SheetPortal>
            </Sheet>
            <div ref={container} />
        </div>
    );
};
