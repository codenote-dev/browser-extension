import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';

import AccordionBar, { type AccordionBarProps } from './AccordionBar';

export type AccordionPanelProps = {
    titleBar: Exclude<AccordionBarProps, 'open'>;
    children: React.ReactNode;
};

const AccordionPanel = ({ titleBar, children }: AccordionPanelProps) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <AccordionBar {...titleBar} open={open} />
                    <Disclosure.Panel
                        as="dd"
                        className="border-[#3D4043] last:border-b">
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default AccordionPanel;
