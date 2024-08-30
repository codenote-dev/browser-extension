import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { cn } from '~utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={className} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="codenote__flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'codenote__flex codenote__flex-1 codenote__items-center codenote__justify-between codenote__py-4 codenote__text-sm codenote__font-medium codenote__transition-all [&[data-state=open]>svg]:codenote__rotate-180',
                className,
            )}
            {...props}>
            {children}
            {/* <ChevronDownIcon className="codenote__h-4 codenote__w-4 codenote__shrink-0 codenote__text-neutral-500 codenote__transition-transform codenote__duration-200 dark:codenote__text-neutral-400" /> */}
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="codenote__overflow-hidden codenote__text-sm data-[state=closed]:codenote__animate-accordion-up data-[state=open]:codenote__animate-accordion-down"
        {...props}>
        <div className={cn('codenote__pb-4 codenote__pt-0', className)}>
            {children}
        </div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
