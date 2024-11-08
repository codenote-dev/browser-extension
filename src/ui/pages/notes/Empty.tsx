import { MessageSquareCode } from 'lucide-react';
import React from 'react';

import { Page } from '~ui/shared/Page';

export function Empty() {
    return (
        <Page>
            <div className="codenote__my-12 codenote__flex codenote__h-full codenote__flex-col codenote__items-center codenote__justify-center">
                <MessageSquareCode color="#fff" size={48} absoluteStrokeWidth />
                <h3 className="codenote__mt-2 codenote__text-sm codenote__font-semibold codenote__text-white">
                    No notes yet :(
                </h3>
                <p className="codenote__mt-1 codenote__text-sm codenote__text-gray-500">
                    Get started by creating a new note is GitHub.
                </p>
            </div>
        </Page>
    );
}
