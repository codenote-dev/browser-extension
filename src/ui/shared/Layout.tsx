import { useSidePanelService } from '~data/services/SidePanelService';
import { Theme, ThemeContext } from '~ui/context/ThemeContext';
import { SheetContent } from '~ui/shared/components/Sheet';
import { Header } from '~ui/shared/Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [sidePanelState, setSidePanelState] = useSidePanelService();

    return (
        <ThemeContext.Provider value={Theme.dark}>
            <div
                data-codenote-theme="dark"
                className="codenote__w-screen codenote__h-screen codenote__fixed codenote__backdrop-blur"
                onClick={(e) => setSidePanelState(false)}>
                <SheetContent
                    onClick={(e) => e.stopPropagation()}
                    toggle={setSidePanelState}
                    className="codenote__overflow-auto codenote__text-black dark:codenote__text-white">
                    <Header />
                    {children}
                </SheetContent>
            </div>
        </ThemeContext.Provider>
    );
};
