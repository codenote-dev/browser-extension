import { z } from 'zod';

import { CodeModel } from './CodeModel';

export const NoteModel = z
    .object({
        id: z.number().gt(0).default(Date.now),
        code: CodeModel,
        note: z.string(),
        startLine: z.number().gt(0).optional(),
        endLine: z.number().gt(0).optional(),
        createdAt: z.number().default(Date.now),
        updatedAt: z.number().default(Date.now),
    })
    .transform((data) => {
        data.startLine = data.code.code[0].lineNumber;
        data.endLine = data.code.code[data.code.code.length - 1].lineNumber + 1;

        return data;
    })
    .refine(({ startLine, endLine }) => endLine! > startLine!, {
        message: 'Code end line should be greater than a start line.',
        path: ['startLine', 'endLine'],
    });

export type TNoteModel = z.infer<typeof NoteModel>;
