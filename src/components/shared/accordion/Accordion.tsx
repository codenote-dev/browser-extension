import * as React from 'react';

import AccordionPanel, { type AccordionPanelProps } from './AccordionPanel';

type AccordionPanelChildren =
    | React.ReactElement<typeof AccordionPanel>[]
    | React.ReactElement<typeof AccordionPanel>;

type AccordionWithPanelsProps = {
    panels: ({
        id: number | string;
    } & AccordionPanelProps)[];
    children?: never;
};

type AccordionWithChildrenProps = {
    panels?: never;
    children: AccordionPanelChildren;
};

export type AccordionProps =
    | AccordionWithPanelsProps
    | AccordionWithChildrenProps;

export function Accordion(props: AccordionProps) {
    let content: AccordionPanelChildren;

    if (props.panels) {
        content = props.panels.map(({ id, titleBar, children }) => (
            <AccordionPanel key={id} titleBar={titleBar}>
                {children}
            </AccordionPanel>
        ));
    } else {
        content = props.children;
    }

    return <dl>{content}</dl>;
}
