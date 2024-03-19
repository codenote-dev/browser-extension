import { StrictMode } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { CreateNote } from '~routes/CreateNote';
import { EditNote } from '~routes/EditNote';
import { Notes } from '~routes/Notes';
import { Root } from '~routes/Root';

import '~/style.css';

const router = createHashRouter([
    {
        element: <Root />,
        children: [
            {
                index: true,
                path: '/',
                element: <Notes />,
                errorElement: <h1>404</h1>,
            },
            {
                path: '/create',
                element: <CreateNote />,
            },
            {
                path: '/edit/:id',
                element: <EditNote />,
            },
        ],
    },
]);

const Sidepanel = () => {
    return (
        // <StrictMode>
        <RouterProvider router={router} />
        // </StrictMode>
    );
};

export default Sidepanel;
