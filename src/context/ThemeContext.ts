import { createContext } from 'react';

import type { ObjectValues } from '~utils';

export const Theme = {
    light: 'light',
    dark: 'dark',
} as const;

type ThemeType = ObjectValues<typeof Theme>;

export const ThemeContext = createContext<ThemeType>(Theme.light);
