import { z } from 'zod';

import GithubApiService from '~data/services/GithubApiService';
import GitLabApiService from '~data/services/GitlabApiService';

export const CodeModel = z
    .object({
        provider: z.union([
            z.literal('github'),
            z.literal('gitlab'),
            z.literal('bitbucket'),
        ]),
        repository: z.string(),
        branchName: z.string(),
        commitId: z.string().trim().min(7).optional(),
        link: z.string().url().optional(),
        file: z.object({
            name: z.string(),
            path: z.string(),
            ext: z.string(),
        }),
        code: z.array(
            z.object({
                lineNumber: z.coerce.number().gt(0),
                code: z.string(),
            }),
        ),
    })
    .transform(async (data) => {
        if (data.provider === 'github') {
            data.commitId = await GithubApiService.getCommitId(
                data.repository,
                data.branchName,
            );
            data.link = GithubApiService.createLink(
                data.repository,
                data.commitId || data.branchName,
                data.file.path,
                data.code[0].lineNumber,
                data.code[data.code.length - 1].lineNumber,
            );
        } else if (data.provider === 'gitlab') {
            data.link = GitLabApiService.createLink(
                data.repository,
                data.commitId || data.branchName,
                data.file.path,
                data.code[0].lineNumber,
                data.code[data.code.length - 1].lineNumber,
            );
        }

        return data;
    });

export type TCodeModel = z.infer<typeof CodeModel>;
