class GitlabApiService {
    getCommitId(): string | undefined {
        const commitContainer = document.querySelector(
            '.commit-sha-group [data-clipboard-text]',
        ) as HTMLElement;

        return commitContainer?.dataset.clipboardText;
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

        return `https://gitlab.com/${repo}/-/blob/${commitId}${filePath}#${highlightedLines}`;
    }
}

export default new GitlabApiService();
