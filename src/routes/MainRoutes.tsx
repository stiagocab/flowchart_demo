import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { FLOW_ROUTES } from './pathGenerator';

const WorkspaceEditorPage = Loadable(lazy(() => import('views/workspaces/editor')));
const WorkspaceListPage = Loadable(lazy(() => import('views/workspaces/main')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: FLOW_ROUTES.main,
            element: <WorkspaceListPage />
        },
        {
            path: FLOW_ROUTES.workspaceCreate,
            element: <WorkspaceEditorPage />
        },
        {
            path: FLOW_ROUTES.workspaceEdit,
            element: <WorkspaceEditorPage />
        }
    ]
};

export default MainRoutes;
