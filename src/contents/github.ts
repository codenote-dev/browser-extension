import type { PlasmoCSConfig } from 'plasmo';

import { Storage } from '@plasmohq/storage';

import { codeLineSchema, codeMetaSchema, codeSchema } from '~schemas/schema';
import type { Code, CodeLine, CodeMeta } from '~schemas/schema';

export const config: PlasmoCSConfig = {
    matches: [
        'https://github.com/*/*/blob/*',
        'https://www.github.com/*/*/blob/*',
    ],
};

const CTA_TEXT = 'Leave a comment';

const highlightedMenuButtonContainerSelector =
    '#highlighted-line-menu-container';
const highlightedMenuSelector = '#__primerPortalRoot__';

const storage = new Storage();

function getCode(): CodeLine[] {
    // Get highlighted line numbers
    const highlightedLineNumbers = [
        ...document.querySelectorAll('.highlighted-line'),
    ].map((el) => (el as HTMLElement).dataset.lineNumber);
    const highlightedCodeSelector = highlightedLineNumbers
        .map((x) => `#LC${x}`)
        .join(',');

    // Search for highlighted code lines and transform them to readable json
    return [...document.querySelectorAll(highlightedCodeSelector)].map((el) => {
        const lineNumber = (el as HTMLElement).dataset.lineNumber;
        const code = [...el.querySelectorAll('[data-code-text]')]
            .map((child) => (child as HTMLElement).dataset.codeText)
            .join('');

        return codeLineSchema.parse({
            lineNumber,
            code,
        });
    });
}

function getMetadata(): CodeMeta {
    const { pathname } = window.location;
    const { title } = document;
    const titleSplit = title.split(' ');
    const [username, repositoryName] =
        titleSplit[titleSplit.length - 1].split('/');
    const repository = `${username}/${repositoryName}`;
    const filePath = titleSplit[0].replace(repositoryName, '');
    const fileName = filePath.split('/').pop();
    const extension = fileName?.split('.').pop();
    const branchName = pathname
        .replace(`/${username}/${repositoryName}`, '') // remove /username/repository from path
        .replace('/blob/', '') // remove /blob/ from path
        .replace(filePath, ''); // remove filePath from path

    return codeMetaSchema.parse({
        branchName,
        file: {
            path: filePath,
            name: fileName,
            ext: extension,
        },
        repository,
    });
}

async function sendToSidePanel(data: Code) {
    await storage.set('code-to-comment', data);
    await chrome.runtime.sendMessage({ type: 'open_side_panel' });
}

function insert() {
    const highlightedMenuButtonContainer = document.querySelector(
        highlightedMenuButtonContainerSelector,
    );
    const highlightedMenuContainer = document.querySelector(
        highlightedMenuSelector,
    );
    const firstMenuItem =
        highlightedMenuContainer?.querySelector('[role="menuitem"]');

    if (!firstMenuItem) {
        return;
    }

    const commentMenuItem = firstMenuItem.cloneNode(true);

    commentMenuItem.textContent = CTA_TEXT;

    commentMenuItem.addEventListener('click', () => {
        const code = getCode();

        sendToSidePanel(
            codeSchema.parse({
                ...getMetadata(),
                code: getCode(),
            }),
        );

        // Close context menu
        highlightedMenuButtonContainer?.querySelector('button')?.click();
    });
    firstMenuItem.parentElement?.insertBefore(commentMenuItem, firstMenuItem);
}

function contentScript() {
    document
        .querySelector(highlightedMenuButtonContainerSelector)
        ?.addEventListener('click', insert);
}

window.addEventListener('load', contentScript);
