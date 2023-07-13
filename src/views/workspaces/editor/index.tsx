import { useEffect } from 'react';

import MainCard from 'ui-component/cards/MainCard';

import { Box, IconButton, Fade, useTheme } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

// third party imports
import { ReactFlowProvider } from 'reactflow';

// components
import WorkspaceHeader from './WorkspaceHeader';
import NodeSelectorSidebar from 'ui-component/flow/NodeSelectorSideBar';
import CustomFlow from 'ui-component/flow/StyledFlow';
import SettingsForm from 'ui-component/flow/SettingsForm';

// hooks
import useFlowContext from 'hooks/useFlowContext';
import { dispatch } from 'store';

import { FlowContextProvider } from 'contexts/FlowContext';
import { openDrawer as openMenu } from 'store/slices/menu';
import { useParams } from 'react-router-dom';
import { getWorkspace } from 'sampleData';

function FlowCustomizer() {
    // hooks
    const theme = useTheme();

    const { flowWrapper, isDrawerOpen, openDrawer, closeDrawer, formIsOpen, closeForm } = useFlowContext();

    useEffect(() => {
        dispatch(openMenu(false));
    }, []);

    return (
        <MainCard showBack content={false} header={<WorkspaceHeader />}>
            <Box sx={{ display: 'flex', position: 'relative', width: 1, height: 520 }}>
                <NodeSelectorSidebar handleClose={closeDrawer} isOpen={isDrawerOpen} />
                <Fade in={!isDrawerOpen}>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 20,
                            left: 20,
                            zIndex: 10,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: theme.shadows[2],
                            '&:hover': { backgroundColor: theme.palette.background.paper }
                        }}
                        onClick={openDrawer}
                    >
                        <SortIcon fontSize="medium" />
                    </IconButton>
                </Fade>

                <Box sx={{ position: 'relative', width: 1, height: 1 }} className="reactflow-wrapper" ref={flowWrapper}>
                    <CustomFlow />
                </Box>

                <SettingsForm handleClose={closeForm} isOpen={formIsOpen} />
            </Box>
        </MainCard>
    );
}

// Wrap the page with providers to allow use
const Flowboard = () => (
    <ReactFlowProvider>
        <FlowContextProvider>
            <FlowCustomizer />
        </FlowContextProvider>
    </ReactFlowProvider>
);

export default Flowboard;
