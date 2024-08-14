import { create, insert, insertMultiple, remove, search } from '@orama/orama';

export class SearchService {
    schema: Object;
    db: any;

    constructor(schema: Object) {
        this.schema = schema;
        this.createDb();
    }

    async createDb() {
        // Create the database here
        this.db = await create({
            schema: this.schema,
        });
    }

    async populate(data: Object[]) {
        await insertMultiple(this.db, data);
    }

    async index(data: Object) {
        await insert(this.db, data);
    }

    async update(id: number, data: Object) {
        await this.remove(id);
        await this.index(data);
    }

    async remove(id: number) {
        await remove(this.db, id);
    }

    async search(term: string) {
        console.log('Searching for:', term);
        // Search the database here
        const result = await search(this.db, {
            term,
        });

        console.log(result);

        return result.hits.map((hit: any) => hit.document);
    }
}
