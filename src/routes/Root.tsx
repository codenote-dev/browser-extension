import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { StorageKey } from '~constants';
import { useStorage } from '~data/storage';
import type { Code } from '~schemas/schema';

import { Layout } from '../components/Layout';

export const Root = () => {
    const [codeToComment] = useStorage<Code>(StorageKey.CODE_TO_COMMENT);
    const navigate = useNavigate();

    useEffect(() => {
        if (codeToComment) {
            navigate('/create', {
                state: {},
            });
        }
    }, [codeToComment]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};
