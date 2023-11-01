import { useContext, type ComponentType, type ReactNode } from 'react';

import { Theme, ThemeContext } from '~context/ThemeContext';
import { type ObjectValues } from '~utils';

export const ButtonVariant = {
    primary: 'primary',
    secondary: 'secondary',
} as const;

export const ButtonSize = {
    xs: 'xs',
    sm: 'sm',
    base: 'base',
    lg: 'lg',
    xl: 'xl',
} as const;

type TButtonVariant = ObjectValues<typeof ButtonVariant>;
type TButtonSize = ObjectValues<typeof ButtonSize>;

export type ButtonProps = {
    variant?: TButtonVariant;
    size?: TButtonSize;
    icon?: ComponentType<{
        className?: string;
    }>;
    text?: string;
    action: (e: any) => void;
};

export function Button(props: ButtonProps) {
    const theme = useContext(ThemeContext);

    const {
        variant = ButtonVariant.primary,
        size = ButtonSize.base,
        text,
        action,
    } = props;
    const baseClasses = ['font-semibold', 'shadow-sm'];
    const variantModifiers = {
        [Theme.light]: {
            [ButtonVariant.primary]: [
                'bg-indigo-600',
                'text-white',
                'hover:bg-indigo-500',
                'focus-visible:outline',
                'focus-visible:outline-2',
                'focus-visible:outline-offset-2',
                'focus-visible:outline-indigo-600',
            ],
            [ButtonVariant.secondary]: [
                'bg-white',
                'text-gray-900',
                'ring-1',
                'ring-inset',
                'ring-gray-300',
                'hover:bg-gray-50',
            ],
        },
        [Theme.dark]: {
            [ButtonVariant.primary]: [
                'bg-indigo-500',
                'text-white',
                'hover:bg-indigo-400',
                'focus-visible:outline',
                'focus-visible:outline-2',
                'focus-visible:outline-offset-2',
                'focus-visible:outline-indigo-500',
            ],
            [ButtonVariant.secondary]: [
                'bg-white/10',
                'text-white',
                'hover:bg-white/20',
            ],
        },
    };

    const sizeModifiers = {
        [ButtonSize.xs]: ['rounded', 'px-2', 'py-1', 'text-xs'],
        [ButtonSize.sm]: ['rounded', 'px-2', 'py-1', 'text-sm'],
        [ButtonSize.base]: ['rounded-md', 'px-2.5', 'py-1.5', 'text-sm'],
        [ButtonSize.lg]: ['rounded-md', 'px-3', 'py-2', 'text-sm'],
        [ButtonSize.xl]: ['rounded-md', 'px-3.5', 'py-2.5', 'text-sm'],
    };

    const iconModifiers = {
        [ButtonSize.xs]: ['inline-flex', 'items-center', 'gap-x-1.5'],
        [ButtonSize.sm]: ['inline-flex', 'items-center', 'gap-x-1.5'],
        [ButtonSize.base]: ['inline-flex', 'items-center', 'gap-x-1.5'],
        [ButtonSize.lg]: ['inline-flex', 'items-center', 'gap-x-1.5'],
        [ButtonSize.xl]: ['inline-flex', 'items-center', 'gap-x-2'],
    };

    const classNames = (props.icon ? iconModifiers[size] : [])
        .concat(baseClasses)
        .concat(variantModifiers[theme][variant])
        .concat(sizeModifiers[size])
        .join(' ');

    return (
        <button type="button" className={classNames} onClick={action}>
            {props.icon ? (
                <props.icon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            ) : null}
            {text}
        </button>
    );
}
