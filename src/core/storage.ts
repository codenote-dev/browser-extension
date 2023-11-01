import { Storage } from '@plasmohq/storage';
import { useStorage as useStoragePlasmo } from '@plasmohq/storage/hook';

export const storage = new Storage({
    area: 'local',
    allCopied: true,
});

export const useStorage = (
    (instance: Storage) =>
    <T>(key: string) =>
        useStoragePlasmo<T>({
            key,
            instance,
        })
)(storage);
