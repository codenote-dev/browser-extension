import { Theme, ThemeContext } from '~ui/context/ThemeContext';
import { Header } from '~ui/shared/Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeContext.Provider value={Theme.dark}>
            <div className="h-full min-h-screen bg-[#202124]">
                <Header />
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
