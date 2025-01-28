import icon from 'data-base64:~../assets/icon.png';
import type { PlasmoCSConfig } from 'plasmo';

import { sendAnalyticsEvent } from '~data/services/AnalyticsService';
import { setCode } from '~data/services/CodeService';
import GitlabApiService from '~data/services/GitlabApiService';

export const config: PlasmoCSConfig = {
    matches: [
        'https://gitlab.com/*',
        'https://www.gitlab.com/*',
        'https://*.gitlab.com/*',
    ],
};

const containerSelector = '.diff-line-num';
const TRIGGER = createTrigger();

function createTrigger() {
    const trigger = document.createElement('span');
    trigger.style.cursor = 'pointer';
    trigger.style.backgroundImage = `url(${icon})`;
    trigger.style.backgroundSize = 'contain';
    trigger.style.backgroundRepeat = 'no-repeat';
    trigger.style.backgroundPosition = 'center';
    trigger.style.width = '18px';
    trigger.style.height = '18px';
    trigger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        sendToSidePanel({
            ...getMetadata(),
            code: getCode(),
        });

        sendAnalyticsEvent('note_create', {
            provider: 'gitlab',
        });

        this.remove();
    });

    return trigger;
}

function getCode() {
    return [...document.querySelectorAll('.code.highlight .line.hll')].map(
        (el) => {
            const lineNumber = el.id.replace('LC', '');
            const code = el.textContent;

            return {
                lineNumber,
                code,
            };
        },
    );
}

function getMetadata() {
    const { pathname } = window.location;
    const [repository, branchAndFile] = pathname.split('/-/blob/');
    const [branchName, filePath] = branchAndFile.split('/');
    const fileName = filePath.split('/').pop();
    const extension = fileName?.split('.').pop();
    const provider = 'gitlab';

    return {
        provider,
        branchName,
        file: {
            path: `/${filePath}`,
            name: fileName,
            ext: extension,
        },
        commitId: GitlabApiService.getCommitId(),
        repository: repository.replace('/', ''),
    };
}

async function sendToSidePanel(data: unknown) {
    setCode(data);
    await chrome.runtime.sendMessage({ type: 'open_side_panel' });
}

function insert(el: Element) {
    const containerEl = el.matches(containerSelector)
        ? el
        : el.closest(containerSelector);
    const lineNumberEl = containerEl!.querySelector('.file-line-num');

    return containerEl!.insertBefore(TRIGGER, lineNumberEl);
}

function getLineClickHandler() {
    let insertedEl: Element | null = null;

    return (e: Event) => {
        if (e.target instanceof Element) {
            insertedEl?.remove();

            if (
                e.target.matches(containerSelector) ||
                !!e.target.closest(containerSelector)
            ) {
                e.stopPropagation();
                insertedEl = insert(e.target as Element);
            }
        }
    };
}

// Listen for clicks on highlighted code lines
document.addEventListener('click', getLineClickHandler());
