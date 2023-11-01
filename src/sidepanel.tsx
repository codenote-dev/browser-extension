import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Accordion, type AccordionProps } from '~components/Accordion';
import { Button } from '~components/Button';
import { StorageKey } from '~constants';
import { Theme, ThemeContext } from '~context/ThemeContext';
import { useStorage } from '~core/storage';
import { useNoteRepository } from '~hooks/useNoteRepository';
import type { Code } from '~schemas/schema';

import '~/style.css';

import { CodeBlock } from '~components/CodeBlock';
import { EditableNote } from '~components/EditableNote';
import { Note } from '~components/Note';
import type { LanguageAlias } from '~utils';

function Sidepanel() {
    const [comment, setComment] = useState('');
    const [codeToComment, setCodeToComment, { remove }] = useStorage<Code>(
        StorageKey.CODE_TO_COMMENT,
    );
    const { create, getAll } = useNoteRepository();
    const notes = getAll();
    let commentsRendered = null;
    let notesRendered = null;

    if (codeToComment) {
        commentsRendered = (
            <div className="new-comment">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-white">
                        Leave a note
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>Help yourself to remember the code</p>
                    </div>
                    <EditableNote
                        code={codeToComment.code}
                        language={codeToComment.file.ext as LanguageAlias}
                        save={(note) => {
                            create(codeToComment, note);
                            remove();
                        }}
                        discard={() => remove()}
                    />
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
                    <>
                        <div className="actions">
                            <Button
                                icon={PencilIcon}
                                variant="secondary"
                                action={() => console.log('clicked')}
                            />
                            <Button
                                icon={TrashIcon}
                                variant="secondary"
                                action={() => console.log('clicked')}
                            />
                        </div>
                        <Note
                            code={note.code}
                            language={note.file.ext as LanguageAlias}
                            note={note.comment}
                        />
                    </>
                ),
            })),
        };

        notesRendered = <Accordion {...props} />;
    }

    if (commentsRendered || notesRendered) {
        return (
            <ThemeContext.Provider value={Theme.dark}>
                <div className="bg-gray-900">
                    {commentsRendered}
                    {notesRendered}
                </div>
            </ThemeContext.Provider>
        );
    }

    return (
        <>
            <ThemeContext.Provider value={Theme.dark}>
                <div className="bg-gray-900">
                    <h1>Empty State</h1>
                </div>
            </ThemeContext.Provider>
        </>
    );
}

export default Sidepanel;
