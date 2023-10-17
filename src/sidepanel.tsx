import * as React from 'react';

import { useStorage } from '@plasmohq/storage/hook';

import { Accordion, type AccordionProps } from '~components/Accordion';
import type { Code } from '~schemas/schema';

import '~/style.css';

function Sidepanel() {
    const [data] = useStorage<Code>('code-to-comment');

    if (!data) {
        return <h1>Nothing to comment</h1>;
    } else {
        return (
            <div className="new-comment">
                <pre className="prose prose-pre">
                    <code className="prose prose-code">
                        {data.code.map((x) => x.code).join('\n')}
                    </code>
                </pre>
                <div>
                    <label
                        htmlFor="comment"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Add your comment
                    </label>
                    <div className="mt-2">
                        <textarea
                            rows={4}
                            name="comment"
                            id="comment"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                    </div>
                </div>
            </div>
        );
    }
    const props: AccordionProps = {
        panels: [
            {
                title: 'What is your refund policy?',
                content:
                    "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
            },
            {
                title: 'Do you offer technical support?',
                content: 'No.',
            },
        ],
    };

    return <Accordion {...props} />;
}

export default Sidepanel;
