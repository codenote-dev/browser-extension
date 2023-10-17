import { z } from 'zod';

export const codeLineSchema = z.object({
    lineNumber: z.coerce.number().gt(0),
    code: z.string(),
});
export const codeMetaSchema = z.object({
    repository: z.string().trim().min(3).includes('/'),
    branchName: z.string().trim().min(1),
    file: z.object({
        name: z.string(),
        path: z.string(),
        ext: z.string(),
    }),
});
export const codeSchema = codeMetaSchema.extend({
    code: z.array(codeLineSchema),
});

export type CodeLine = z.infer<typeof codeLineSchema>;
export type CodeMeta = z.infer<typeof codeMetaSchema>;
export type Code = z.infer<typeof codeSchema>;
