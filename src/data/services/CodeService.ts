import { StorageKey } from '~constants';
import { CodeModel, type TCodeModel } from '~data/models/CodeModel';
import { storage, useStorage } from '~data/storage';

export const setCode = async (codeArg: unknown) => {
    const code = await CodeModel.parseAsync(codeArg);

    await storage.set(StorageKey.CODE_TO_COMMENT, code);
};

export const getCode = async (): Promise<TCodeModel | null> => {
    return (await storage.get(StorageKey.CODE_TO_COMMENT)) || null;
};

export const popCode = async (): Promise<TCodeModel | null> => {
    const code: TCodeModel | null =
        (await storage.get(StorageKey.CODE_TO_COMMENT)) || null;

    await storage.remove(StorageKey.CODE_TO_COMMENT);

    return code;
};

export const pruneCode = async (): Promise<void> => {
    await storage.remove(StorageKey.CODE_TO_COMMENT);
};

export function useCodeService(): [
    TCodeModel | undefined,
    (code?: unknown) => void,
] {
    const [code, setCode, { remove }] = useStorage<TCodeModel>(
        StorageKey.CODE_TO_COMMENT,
    );

    return [
        code,
        (codeArg: unknown) => {
            if (!codeArg) {
                remove();
                return;
            }

            CodeModel.parseAsync(codeArg).then((code) => setCode(code));
        },
    ];
}
