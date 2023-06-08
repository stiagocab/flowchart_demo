import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { CustomFlowContextProvider } from 'views/pages/flowchart/CustomFlowContext';

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
            path: '/dashboard/flowchart',
            element: (
                <CustomFlowContextProvider>
                    <FlowchartPage />
                </CustomFlowContextProvider>
            )
        },
        {
            path: '/flows/customizer',
            element: <FlowsCustomizerPage />
        }
    ]
};

export default MainRoutes;
