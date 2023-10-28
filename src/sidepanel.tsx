import { useState } from 'react';

import { Storage } from '@plasmohq/storage';
import { useStorage } from '@plasmohq/storage/hook';

import { Accordion, type AccordionProps } from '~components/Accordion';
import { StorageKey } from '~constants';
import type { Code, NoteOutput } from '~schemas/schema';

import '~/style.css';

import { useNoteRepository } from '~hooks/useNoteRepository';

function Sidepanel() {
    const [comment, setComment] = useState('');
    const [codeToComment, setCodeToComment, { remove }] = useStorage<Code>({
        key: StorageKey.CODE_TO_COMMENT,
        instance: new Storage({
            area: 'local',
        }),
    });
    const { create, getAll } = useNoteRepository();
    const notes = getAll();
    let commentsRendered = null;
    let notesRendered = null;

    console.log(notes);

    if (codeToComment) {
        commentsRendered = (
            <div className="new-comment">
                <pre className="prose-pre prose">
                    <code className="prose-code prose">
                        {codeToComment.code.map((x) => x.code).join('\n')}
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
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => {
                                remove();
                            }}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            onClick={() => {
                                create(codeToComment, comment);
                                remove();
                            }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (notes?.length) {
        const props: AccordionProps = {
            panels: notes.map((note) => ({
                id: note.id,
                title: `${note.file.path}`,
                content: (
                    <div>
                        <pre className="prose-pre prose">
                            <code className="prose-code prose">
                                {note.code.map((x) => x.code).join('\n')}
                            </code>
                        </pre>
                        <p>{note.comment}</p>
                    </div>
                ),
            })),
        };

        notesRendered = <Accordion {...props} />;
    }

    if (commentsRendered || notesRendered) {
        return (
            <div className="bg-gray-900">
                (
                <>
                    {commentsRendered}
                    {notesRendered}
                </>
                )
            </div>
        );
    }

    return (
        <div className="bg-gray-900">
            <h1>Empty State</h1>
        </div>
    );
}

export default Sidepanel;
