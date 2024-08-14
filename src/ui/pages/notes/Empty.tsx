import { Notes } from 'iconoir-react';
import React from 'react';

export function Empty() {
    return (
        <div className="my-12 flex h-full flex-col items-center justify-center">
            <Notes color="#fff" width={48} height={48} strokeWidth={0.5} />
            <h3 className="mt-2 text-sm font-semibold text-white">
                No notes yet :(
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new note is GitHub.
            </p>
        </div>
    );
}
