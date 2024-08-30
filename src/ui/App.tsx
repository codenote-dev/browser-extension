import { StrictMode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { pruneNotes } from '~data/services/NotesService';
import NotFound from '~ui/pages/404';
import { CreateNote } from '~ui/pages/notes/Create';
import { EditNote } from '~ui/pages/notes/Edit';
import { Notes } from '~ui/pages/notes/List';
import { Root } from '~ui/pages/Root';

const router = createMemoryRouter([
    {
        element: <Root />,
        children: [
            {
                index: true,
                path: '/',
                element: <Notes />,
                errorElement: <NotFound />,
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

// pruneNotes();

export const App = () => (
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
