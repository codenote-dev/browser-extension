import logo from 'data-base64:~../assets/logo-inverse.png';

export const Header = () => (
    <header
        className="codenote__flex codenote__items-center codenote__justify-center codenote__mx-6 codenote__my-3"
        aria-label="Global">
        <a href="https://codenote.dev">
            <span className="codenote__sr-only">Code Note</span>
            <img className="codenote__h-8" src={logo} alt="" />
        </a>
    </header>
);
