import { sendAnalyticsEvent } from '~data/services/AnalyticsService';
import { useSidePanelService } from '~data/services/SidePanelService';
import { Theme, ThemeContext } from '~ui/context/ThemeContext';
import { SheetContent } from '~ui/shared/components/Sheet';
import { Footer } from '~ui/shared/Footer';
import { Header } from '~ui/shared/Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [_sidePanelState, setSidePanelState] = useSidePanelService();

    return (
        <ThemeContext.Provider value={Theme.dark}>
            <div
                data-codenote-theme="dark"
                className="codenote__fixed codenote__h-screen codenote__w-screen codenote__backdrop-blur"
                onClick={() => {
                    sendAnalyticsEvent('side_panel_close');
                    setSidePanelState(false);
                }}>
                <SheetContent
                    onClick={(e) => e.stopPropagation()}
                    toggle={setSidePanelState}
                    className="codenote__overflow-auto codenote__text-black dark:codenote__text-white"
                    aria-describedby="side-panel">
                    <Header />
                    {children}
                    <Footer />
                </SheetContent>
            </div>
        </ThemeContext.Provider>
    );
};
