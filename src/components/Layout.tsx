import { Theme, ThemeContext } from '~context/ThemeContext';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeContext.Provider value={Theme.dark}>
            <div className="h-screen bg-[#202124]">{children}</div>
        </ThemeContext.Provider>
    );
};
