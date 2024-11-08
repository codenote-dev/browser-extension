import { Linkedin } from 'lucide-react';

export const Footer = () => (
    <footer className="codenote__fixed codenote__bottom-0 codenote__flex codenote__w-full codenote__max-w-96 codenote__flex-col codenote__gap-y-4 codenote__bg-background codenote__p-4">
        <div className="codenote__flex codenote__justify-center codenote__gap-x-6">
            <a
                href="https://www.linkedin.com/in/yukhnevych/"
                className="codenote__pt-0.5 codenote__text-gray-400 hover:codenote__text-gray-300"
                target="_blank">
                <span className="codenote__sr-only">LinkedIn</span>
                <Linkedin aria-hidden="true" size="20" />
            </a>
            <a
                href="https://github.com/codenote-dev/browser-extension"
                className="codenote__inline-flex codenote__items-center codenote__gap-x-2 codenote__rounded-md codenote__bg-white/10 codenote__px-2 codenote__py-1 codenote__text-xs codenote__font-semibold codenote__text-white codenote__shadow-sm hover:codenote__bg-white/20"
                target="_blank">
                <svg
                    aria-hidden="true"
                    viewBox="0 0 496 512"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
                Open Source
            </a>
            <a
                href="https://github.com/sponsors/codenote-dev"
                className="codenote__inline-flex codenote__items-center codenote__gap-x-2 codenote__rounded-md codenote__bg-white/10 codenote__px-2 codenote__py-1 codenote__text-xs codenote__font-semibold codenote__text-white codenote__shadow-sm hover:codenote__bg-white/20"
                target="_blank">
                <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    fill="#c96198">
                    <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
                </svg>
                Become a Sponsor
            </a>
        </div>
        <p className="codenote__text-center codenote__text-sm/6 codenote__text-gray-400">
            Copyright © {new Date().getFullYear()}{' '}
            <a href="https://codenote.dev" className="codenote__underline">
                CodeNote.dev
            </a>{' '}
            Contributors
        </p>
    </footer>
);
