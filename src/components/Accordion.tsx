import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import * as React from 'react';

export type AccordionProps = {
    panels: {
        id: number;
        title: string;
        content: React.ReactNode;
    }[];
};

export function Accordion({ panels }: AccordionProps) {
    const toRender = panels.map(({ id, title, content }) => (
        <Disclosure as="div" key={id} className="pt-6">
            {({ open }) => (
                <>
                    <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                            <span className="text-base font-semibold leading-7">
                                {title}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                    <MinusSmallIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <PlusSmallIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                )}
                            </span>
                        </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-300">
                            {content}
                        </p>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    ));

    return (
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-4xl divide-y divide-white/10">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
                    Notes
                </h2>
                <dl className="mt-10 space-y-6 divide-y divide-white/10">
                    {toRender}
                </dl>
            </div>
        </div>
    );
}
