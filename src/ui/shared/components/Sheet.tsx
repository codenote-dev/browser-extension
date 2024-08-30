import * as SheetPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~utils';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
        className={cn(
            'codenote__fixed codenote__inset-0 codenote__z-50 codenote__bg-black/80 codenote__ data-[state=open]:codenote__animate-in data-[state=closed]:codenote__animate-out data-[state=closed]:codenote__fade-out-0 data-[state=open]:codenote__fade-in-0',
            className,
        )}
        {...props}
        ref={ref}
    />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
    'codenote__fixed codenote__z-50 codenote__gap-4 codenote__bg-background codenote__shadow-lg codenote__transition codenote__ease-in-out data-[state=closed]:codenote__duration-300 data-[state=open]:codenote__duration-500 data-[state=open]:codenote__animate-in data-[state=closed]:codenote__animate-out dark:codenote__bg-background',
    {
        variants: {
            side: {
                top: 'codenote__inset-x-0 codenote__top-0 codenote__border-b data-[state=closed]:codenote__slide-out-to-top data-[state=open]:codenote__slide-in-from-top',
                bottom: 'codenote__inset-x-0 codenote__bottom-0 codenote__border-t data-[state=closed]:codenote__slide-out-to-bottom data-[state=open]:codenote__slide-in-from-bottom',
                left: 'codenote__inset-y-0 codenote__left-0 codenote__h-full codenote__w-3/4 codenote__border-r data-[state=closed]:codenote__slide-out-to-left data-[state=open]:codenote__slide-in-from-left sm:codenote__max-w-96',
                right: 'codenote__inset-y-0 codenote__right-0 codenote__h-full codenote__w-3/4 codenote__border-l data-[state=closed]:codenote__slide-out-to-right data-[state=open]:codenote__slide-in-from-right sm:codenote__max-w-96',
            },
        },
        defaultVariants: {
            side: 'right',
        },
    },
);

interface SheetContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
        VariantProps<typeof sheetVariants> {
    toggle: (isOpen: boolean) => void;
}

const SheetContent = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Content>,
    SheetContentProps
>(({ side = 'right', className, children, toggle, ...props }, ref) => (
    <>
        <SheetOverlay onClick={() => toggle(false)} />
        <SheetPrimitive.Content
            ref={ref}
            className={cn(sheetVariants({ side }), className)}
            {...props}>
            <SheetPrimitive.Close
                onClick={() => toggle(false)}
                className="codenote__absolute codenote__right-4 codenote__top-4 codenote__rounded-sm codenote__opacity-70 codenote__ring-offset-white codenote__font-white codenote__transition-opacity hover:codenote__opacity-100 focus:codenote__outline-none focus:codenote__ring-2 focus:codenote__ring-neutral-950 focus:codenote__ring-offset-2 disabled:codenote__pointer-events-none data-[state=open]:codenote__bg-neutral-100 dark:codenote__ring-offset-neutral-950 dark:focus:codenote__ring-neutral-300 dark:data-[state=open]:codenote__bg-neutral-800">
                <Cross2Icon className="codenote__h-4 codenote__w-4" />
                <span className="codenote__sr-only">Close</span>
            </SheetPrimitive.Close>
            {children}
        </SheetPrimitive.Content>
    </>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'codenote__flex codenote__flex-col codenote__space-y-2 codenote__text-center sm:codenote__text-left',
            className,
        )}
        {...props}
    />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'codenote__flex codenote__flex-col-reverse sm:codenote__flex-row sm:codenote__justify-end sm:codenote__space-x-2',
            className,
        )}
        {...props}
    />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Title
        ref={ref}
        className={cn(
            'codenote__text-lg codenote__font-semibold codenote__text-neutral-950 dark:codenote__text-neutral-50',
            className,
        )}
        {...props}
    />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Description
        ref={ref}
        className={cn(
            'codenote__text-sm codenote__text-neutral-500 dark:codenote__text-neutral-400',
            className,
        )}
        {...props}
    />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};
