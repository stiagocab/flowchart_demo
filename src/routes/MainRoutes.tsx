import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { FLOW_ROUTES } from './pathGenerator';

const WorkspaceEditor = Loadable(lazy(() => import('views/pages/flowboard')));
const WorkspacePages = Loadable(lazy(() => import('views/workspaces/main')));

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
            element: <WorkspacePages />
        },
        {
            path: FLOW_ROUTES.workspaceCreate,
            element: <WorkspaceEditor />
        }
    ]
};

export default MainRoutes;
