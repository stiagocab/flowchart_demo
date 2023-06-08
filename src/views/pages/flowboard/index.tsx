import { useState } from 'react';

import { ReactFlowProvider } from 'reactflow';
import MainCard from 'ui-component/cards/MainCard';

import { Box, IconButton, Fade, useTheme } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

import NodeSelectorSidebar from './components/NodeSelectorSideBar';
import CustomFlow from './components/StyledFlow';
import useFlowContext from './hooks/useFlowContext';

export default function FlowCustomizer() {
    // hooks
    const theme = useTheme();
    const { flowWrapper } = useFlowContext();

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    return (
        <MainCard title="Customizer" content={false}>
            <ReactFlowProvider>
                <Box sx={{ display: 'flex', position: 'relative', width: 1, height: 500 }}>
                    <NodeSelectorSidebar handleClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen} />
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
                            onClick={() => {
                                setIsDrawerOpen(true);
                            }}
                        >
                            <SortIcon fontSize="medium" />
                        </IconButton>
                    </Fade>

                    <Box sx={{ position: 'relative', width: 1, height: 1 }} className="reactflow-wrapper" ref={flowWrapper}>
                        <CustomFlow />
                    </Box>
                </Box>
            </ReactFlowProvider>
        </MainCard>
    );
}
