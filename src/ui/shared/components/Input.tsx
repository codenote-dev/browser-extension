import * as React from 'react';

import { cn } from '~utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'codenote__flex codenote__h-9 codenote__w-full codenote__rounded-md codenote__border codenote__border-input codenote__bg-transparent codenote__px-3 codenote__py-1 codenote__text-sm codenote__shadow-sm codenote__transition-colors file:codenote__border-0 file:codenote__bg-transparent file:codenote__text-sm file:codenote__font-medium placeholder:codenote__text-neutral-500 focus-visible:codenote__outline-none focus-visible:codenote__ring-1 focus-visible:codenote__ring-neutral-950 disabled:codenote__cursor-not-allowed disabled:codenote__opacity-50 dark:codenote__border-input dark:placeholder:codenote__text-neutral-400 dark:focus-visible:codenote__ring-neutral-300',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
