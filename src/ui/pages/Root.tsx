import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useCodeService } from '~data/services/CodeService';
import { Layout } from '~ui/shared/Layout';

export const Root = () => {
    const navigate = useNavigate();
    const [code] = useCodeService();

    useEffect(() => {
        // Redirect to the create page if there is code to add note to
        if (code) {
            navigate('/create');
        }
    }, [code]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};
