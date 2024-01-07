import type { File } from '~schemas/schema';

export async function getCommitId(
    repo: string,
    branch: string,
): Promise<string> {
    const res = await fetch(
        `https://api.github.com/repos/${repo}/commits/${branch}`,
    );
    const { sha } = await res.json();

    return sha;
}

export function createLink(repo: string, commitId: string, file: File) {
    return `https://github.com/${repo}/blob/${commitId}${file.path}`;
}
