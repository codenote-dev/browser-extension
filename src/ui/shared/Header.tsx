import logo from 'data-base64:~../assets/logo-inverse.png';

export const Header = () => (
    <header
        className="flex items-center justify-center px-6 py-3"
        aria-label="Global">
        <a href="https://codenote.dev">
            <span className="sr-only">Code Note</span>
            <img className="h-8" src={logo} alt="" />
        </a>
    </header>
);
