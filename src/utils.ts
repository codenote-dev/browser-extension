import { LANGUAGE_TO_ALIASES } from '~constants';

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
