import { DragEvent } from 'react';

import { Box, Divider, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import zIndex from '@mui/material/styles/zIndex';
import SkeletonNode from '../nodes/SkeletonNode';

const drawerWidth = '25%';

const NodeSelectorSidebar = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Box
            // component="aside"
            sx={{
                width: isOpen ? drawerWidth : 0,
                transitionDuration: '330ms',
                transitionTimingFunction: 'linear',
                height: 1,
                boxSizing: 'border-box',
                zIndex: 10,
                overflow: 'hidden'
            }}
        >
            <Stack alignItems="flex-end" justifyContent="flex-end" sx={{ width: 1 }}>
                <IconButton sx={{ mr: 1, mt: 1 }} onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Stack>
            <Box sx={{ p: 2 }}>
                <Box sx={{ mb: 1, cursor: 'grab' }} onDragStart={(event) => onDragStart(event, 'skeleton')} draggable>
                    <SkeletonNode data={{ hideHandle: true, origin: 'SIDE' }} />
                </Box>
            </Box>
        </Box>
    );
};

export default NodeSelectorSidebar;
