import type { ReactNode } from 'react';

import { cn } from '~lib/utils';
import {
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '~ui/shared/components/Sheet';

type PageProps = {
    title?: string;
    subtitle?: string;
    className?: string;
    classNameHeader?: string;
    classNameContent?: string;
    children: ReactNode;
};

export function Page({
    title,
    subtitle,
    className,
    classNameHeader,
    classNameContent,
    children,
}: PageProps) {
    return (
        <div className={cn('codenote__mx-3', className)}>
            {title && (
                <SheetHeader className={cn('codenote__my-3', classNameHeader)}>
                    <SheetTitle>{title}</SheetTitle>
                    {subtitle && (
                        <SheetDescription>{subtitle}</SheetDescription>
                    )}
                </SheetHeader>
            )}
            <div className={cn('codenote__my-3', classNameContent)}>
                {children}
            </div>
        </div>
    );
}
