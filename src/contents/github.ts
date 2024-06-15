import type { PlasmoCSConfig } from 'plasmo';

import { StorageKey } from '~constants';
import { storage } from '~data/storage';
import {
    codeLineSchema,
    codeLocationSchema,
    codeSchema,
} from '~schemas/schema';
import type { Code, CodeLine, CodeLocation } from '~schemas/schema';

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

function getCode(): CodeLine[] {
    // Get highlighted line numbers
    const highlightedLineNumbers = [
        ...document.querySelectorAll('.highlighted-line'),
    ].map((el) => (el as HTMLElement).dataset.lineNumber);
    const startLine = parseInt(highlightedLineNumbers[0] || '1', 10);
    const highlightedCodeSelector = highlightedLineNumbers
        .map((x) => `#LC${x}`)
        .join(',');

    // Search for highlighted code lines and transform them to readable json
    return [...document.querySelectorAll(highlightedCodeSelector)].map(
        (el, index) => {
            const lineNumber = startLine + index;
            const code = el.textContent;

            return codeLineSchema.parse({
                lineNumber,
                code,
            });
        },
    );
}

function getMetadata(): CodeLocation {
    const { pathname } = window.location;
    const { title } = document;
    const repository = pathname.split('/blob')[0].replace('/', '');
    const [username, repositoryName] = repository.split('/');
    const filePath = title.split(' ')[0].replace(repositoryName, '');
    const fileName = filePath.split('/').pop();
    const extension = fileName?.split('.').pop();
    const branchName = pathname
        .replace(`/${repository}`, '') // remove /username/repository from path
        .replace('/blob/', '') // remove /blob/ from path
        .replace(filePath, ''); // remove filePath from path
    const provider = 'github';

    return codeLocationSchema.parse({
        provider,
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
    console.log(data);
    await storage.set(StorageKey.CODE_TO_COMMENT, data);
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

// Listen for clicks on highlighted code
document.addEventListener('click', (e) => {
    if (e.target instanceof Element) {
        if (
            e.target.matches(highlightedMenuButtonContainerSelector) ||
            !!e.target.closest(highlightedMenuButtonContainerSelector)
        ) {
            e.stopPropagation();
            insert();
        }
    }
});
