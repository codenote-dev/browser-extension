import { useState } from 'react';

import { useNotesService } from '~data/services/NotesService';
import RepositoriesAccordion from '~ui/components/RepositoriesAccordion';
import SearchInput from '~ui/components/SearchInput';
import { Page } from '~ui/shared/Page';

import { Empty } from './Empty';

export const Notes = () => {
    const { getAll, hasAny, search } = useNotesService();
    const [searchTerm, setSearchTerm] = useState<string>('');
    let notes = getAll();

    if (!hasAny()) {
        return <Empty />;
    }

    if (searchTerm.length > 2) {
        notes = search(searchTerm);
    }

    return (
        <Page className="codenote__mx-0">
            <SearchInput searchTerm={searchTerm} onSearch={setSearchTerm} />
            <RepositoriesAccordion notes={notes} />
        </Page>
    );
};
