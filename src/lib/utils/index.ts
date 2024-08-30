import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { BrowserName, LANGUAGE_TO_ALIASES } from '~constants';

const twMerge = extendTailwindMerge({
    prefix: 'codenote__',
});

export type Language = keyof typeof LANGUAGE_TO_ALIASES;
export type LanguageAlias = ObjectValues<typeof LANGUAGE_TO_ALIASES>[number];
type AliasToLanguage = Record<LanguageAlias, Language>;

const reverseIndex = (Object.keys(LANGUAGE_TO_ALIASES) as Language[]).reduce(
    (acc, language) => {
        const aliases = LANGUAGE_TO_ALIASES[language];

        aliases.forEach((alias: LanguageAlias) => (acc[alias] = language));

        return acc;
    },
    {} as AliasToLanguage,
);

export type ObjectValues<T> = T[keyof T];

export function getCodeLanguage(alias: LanguageAlias): Language {
    return reverseIndex[alias];
}

export function removeLeadingSlash(str: string) {
    return str.replace(/^\//, '');
}

export function shortenCommitId(commitId: string) {
    return commitId.slice(0, 7);
}

export function getBrowserNameClient() {
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

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
