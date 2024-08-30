import Fuse from 'fuse.js';

export class SearchService<T extends Object> {
    index: Fuse<T> | null = null;
    options = {
        // isCaseSensitive: false,
        // includeScore: true,
        // shouldSort: true,
        // includeMatches: true,
        // findAllMatches: false,
        minMatchCharLength: 3,
        // location: 0,
        threshold: 0.4,
        // distance: 100,
        // useExtendedSearch: false,
        ignoreLocation: true,
        // ignoreFieldNorm: false,
    };

    constructor() {}

    createIndex(keys: string[], data: T[]) {
        // Create the database here
        this.index = new Fuse<T>(data, { ...this.options, keys });
    }

    getIndex() {
        return this.index;
    }

    getIndexRaw() {
        return this.getIndexOrThrow().getIndex();
    }

    private getIndexOrThrow() {
        if (!this.index) {
            throw new Error('Index not created');
        }

        return this.index;
    }

    add(data: T) {
        this.getIndexOrThrow().add(data);
    }

    remove(cb: (doc: T) => boolean) {
        this.getIndexOrThrow().remove(cb);
    }

    search(term: string): T[] {
        return this.getIndexOrThrow()
            .search<T>(term)
            .map((r) => r.item);
    }
}
