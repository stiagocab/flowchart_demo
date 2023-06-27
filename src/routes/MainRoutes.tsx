import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { CustomFlowContextProvider } from 'views/pages/flowchart/CustomFlowContext';
import WorkspacePages from 'views/pages/workspace';
import { FLOW_ROUTES } from './pathGenerator';

const FlowchartPage = Loadable(lazy(() => import('views/pages/flowchart')));
const FlowsCustomizerPage = Loadable(lazy(() => import('views/pages/flowboard')));

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
            path: FLOW_ROUTES.workspaceEdit,
            element: <FlowsCustomizerPage />
        },
        {
            path: FLOW_ROUTES.workspaceCreate,
            element: <FlowsCustomizerPage />
        }
    ]
};

export default MainRoutes;
