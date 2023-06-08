import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { CustomFlowContextProvider } from 'views/pages/flowchart/CustomFlowContext';
import { FlowContextProvider } from 'views/pages/flowboard/context/FlowContext';

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
            element: (
                <FlowContextProvider>
                    <FlowsCustomizerPage />
                </FlowContextProvider>
            )
        }
    ]
};

export default MainRoutes;
