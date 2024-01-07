import { z } from 'zod';

const fileSchema = z.object({
    name: z.string(),
    path: z.string(),
    ext: z.string(),
});

export const providerSchema = z.union([
    z.literal('github'),
    z.literal('gitlab'),
    z.literal('bitbucket'),
]);

export const codeLineSchema = z.object({
    lineNumber: z.coerce.number().gt(0),
    code: z.string(),
});
export const codeLocationSchema = z.object({
    provider: providerSchema,
    repository: z.string(),
    branchName: z.string(),
    file: fileSchema,
});
export const codeSchema = codeLocationSchema.extend({
    code: z.array(codeLineSchema),
});

export const noteSchema = z.object({
    provider: providerSchema,
    repository: z.string(),
    commitId: z.string().trim().min(7),
    link: z.string().url(),
    file: fileSchema,
    startLine: z.number().gt(0),
    endLine: z.number().gt(0),
    code: z.array(codeLineSchema),
    comment: z.string(),
});

noteSchema.refine(({ startLine, endLine }) => endLine > startLine, {
    message: 'Code end line should be greater than a start line.',
    path: ['startLine', 'endLine'],
});

export const noteOutputSchema = noteSchema.extend({
    id: z.number().gt(0),
    createdAt: z.number(),
    updatedAt: z.number(),
});

export type Provider = z.infer<typeof providerSchema>;
export type File = z.infer<typeof fileSchema>;
export type CodeLine = z.infer<typeof codeLineSchema>;
export type CodeLocation = z.infer<typeof codeLocationSchema>;
export type Code = z.infer<typeof codeSchema>;
export type Note = z.infer<typeof noteSchema>;
export type NoteOutput = z.infer<typeof noteOutputSchema>;
