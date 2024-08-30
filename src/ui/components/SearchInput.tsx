import React from 'react';

import { Input } from '~ui/shared/components/Input';

interface Props {
    searchTerm: string;
    onSearch: (term: string) => void;
}

const SearchInput: React.FC<Props> = ({ searchTerm, onSearch }) => (
    <div className="codenote__p-3 codenote__border-t">
        <Input
            className="codenote__w-full"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
        />
    </div>
);

export default SearchInput;
