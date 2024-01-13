import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

export type AccordionBarProps = {
    title: string;
    icon?: React.ReactElement;
    label?: string;
    variant?: 'primary' | 'secondary';
    open?: boolean;
    trim?: {
        direction: 'start' | 'end';
        maxWidth: number;
    };
};

const AccordionBar = ({
    title,
    icon,
    label,
    variant = 'primary',
    open = false,
    trim = { direction: 'end', maxWidth: 250 },
}: AccordionBarProps) => {
    const barClass = classNames(
        'flex w-full cursor-pointer items-start justify-between p-3 text-left text-white',
        {
            'border-[#3D4043] border-b': variant === 'primary',
            'border-[#3D4043] last:border-b': variant === 'secondary',
        },
    );
    const labelClass = classNames(
        'inline-flex items-center px-2 py-1 text-xs font-medium',
        {
            'bg-[#6e7781] rounded-full ': variant === 'primary',
        },
    );
    const titleClass = classNames('flex leading-7', {
        'font-bold text-base': variant === 'primary',
        'text-sm': variant === 'secondary',
    });
    const toggleIcon = open ? (
        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
    ) : (
        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
    );
    const labelSlot = label?.length ? (
        <span className={labelClass}>{label}</span>
    ) : (
        toggleIcon
    );
    const renderedTitle = trim ? (
        <span
            className={`w-[${trim.maxWidth}px] overflow-hidden text-ellipsis whitespace-nowrap text-left`}
            dir={trim.direction === 'end' ? 'rtl' : 'ltr'}>
            {title}
        </span>
    ) : (
        title
    );
    return (
        <Disclosure.Button as="dt" className={barClass}>
            <span className={titleClass} title={title}>
                {icon && <span className="mr-2 w-5 fill-white">{icon}</span>}
                {renderedTitle}
            </span>
            <span className="flex h-7 items-center">{labelSlot}</span>
        </Disclosure.Button>
    );
};

export default AccordionBar;
