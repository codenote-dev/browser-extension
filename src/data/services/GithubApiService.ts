class GithubApiService {
    async getCommitId(repo: string, branch: string): Promise<string> {
        const res = await fetch(
            `https://api.github.com/repos/${repo}/commits/${branch}`,
        );
        const { sha } = await res.json();

        return sha;
    }

    createLink(
        repo: string,
        commitId: string,
        filePath: string,
        startLine: number,
        endLine: number,
    ) {
        const highlightedLines =
            startLine === endLine
                ? `L${startLine}`
                : `L${startLine}-L${endLine}`;

        return `https://github.com/${repo}/blob/${commitId}${filePath}#${highlightedLines}`;
    }
}

export default new GithubApiService();
