import { useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

import { Box, IconButton, Fade, useTheme } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

import NodeSelectorSidebar from './components/NodeSelectorSideBar';
import CustomFlow from './components/StyledFlow';
import useFlowContext from './hooks/useFlowContext';
import { ReactFlowProvider } from 'reactflow';
import { FlowContextProvider } from './context/FlowContext';

function FlowCustomizer() {
    // hooks
    const theme = useTheme();
    const { flowWrapper, isDrawerOpen, openDrawer, closeDrawer } = useFlowContext();

    return (
        <MainCard content={false}>
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
