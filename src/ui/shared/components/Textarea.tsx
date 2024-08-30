import * as React from 'react';

import { cn } from '~utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'codenote__flex codenote__min-h-[60px] codenote__w-full codenote__rounded-md codenote__border codenote__border-neutral-200 codenote__bg-transparent codenote__px-3 codenote__py-2 codenote__text-sm codenote__shadow-sm placeholder:codenote__text-neutral-500 focus-visible:codenote__outline-none focus-visible:codenote__ring-1 focus-visible:codenote__ring-neutral-950 disabled:codenote__cursor-not-allowed disabled:codenote__opacity-50 dark:codenote__border-neutral-800 dark:placeholder:codenote__text-neutral-400 dark:focus-visible:codenote__ring-neutral-300',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

export { Textarea };
