import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { CreateNote } from '~routes/CreateNote';
import { Notes } from '~routes/Notes';
import { Root } from '~routes/Root';

import '~/style.css';

const router = createMemoryRouter([
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
        ],
    },
]);

const Sidepanel = () => {
    return <RouterProvider router={router} />;
};

export default Sidepanel;
