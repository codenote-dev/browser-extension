import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~utils';

const buttonVariants = cva(
    'codenote__inline-flex codenote__items-center codenote__justify-center codenote__whitespace-nowrap codenote__rounded-md codenote__text-sm codenote__font-medium codenote__transition-colors focus-visible:codenote__outline-none focus-visible:codenote__ring-1 focus-visible:codenote__ring-neutral-950 disabled:codenote__pointer-events-none disabled:codenote__opacity-50 dark:focus-visible:codenote__ring-neutral-300',
    {
        variants: {
            variant: {
                default:
                    'codenote__bg-neutral-900 codenote__text-neutral-50 codenote__shadow hover:codenote__bg-neutral-900/90 dark:codenote__bg-neutral-50 dark:codenote__text-neutral-900 dark:hover:codenote__bg-neutral-50/90',
                destructive:
                    'codenote__bg-red-500 codenote__text-neutral-50 codenote__shadow-sm hover:codenote__bg-red-500/90 dark:codenote__bg-red-900 dark:codenote__text-neutral-50 dark:hover:codenote__bg-red-900/90',
                outline:
                    'codenote__border codenote__border-neutral-200 codenote__bg-white codenote__shadow-sm hover:codenote__bg-neutral-100 hover:codenote__text-neutral-900 dark:codenote__border-neutral-800 dark:codenote__bg-neutral-950 dark:hover:codenote__bg-neutral-800 dark:hover:codenote__text-neutral-50',
                primary:
                    'codenote__bg-primary codenote__text-neutral-50 hover:codenote__bg-primary dark:codenote__bg-primary dark:hover:codenote__bg-primary/80',
                secondary:
                    'codenote__bg-neutral-100 codenote__text-neutral-900 codenote__shadow-sm hover:codenote__bg-neutral-100/80 dark:codenote__bg-neutral-800 dark:codenote__text-neutral-50 dark:hover:codenote__bg-neutral-800/80',
                ghost: 'hover:codenote__bg-neutral-100 hover:codenote__text-neutral-900 dark:hover:codenote__bg-neutral-800 dark:hover:codenote__text-neutral-50',
                link: 'codenote__text-neutral-900 codenote__underline-offset-4 hover:codenote__underline dark:codenote__text-neutral-50',
            },
            size: {
                default: 'codenote__h-9 codenote__px-4 codenote__py-2',
                sm: 'codenote__h-8 codenote__rounded-md codenote__px-3 codenote__text-xs',
                lg: 'codenote__h-10 codenote__rounded-md codenote__px-8',
                icon: 'codenote__h-9 codenote__w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
