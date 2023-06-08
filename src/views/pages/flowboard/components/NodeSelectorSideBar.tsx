import { DragEvent, ReactNode } from 'react';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SkeletonNode from '../nodes/SkeletonNode';

const drawerWidth = '20%';

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
                <NodeDragWrapper onDragStart={(event) => onDragStart(event, 'skeleton')}>
                    <SkeletonNode data={{ hideHandle: true, origin: 'SIDE' }} />
                </NodeDragWrapper>

                {['input', 'output', 'default'].map((nodeType) => (
                    <NodeDragWrapper onDragStart={(event) => onDragStart(event, nodeType)}>
                        <Box sx={{ border: '2px solid white', p: 2, borderRadius: 1 }}>
                            <Typography sx={{ textAlign: 'center' }}>{nodeType.toUpperCase()}</Typography>
                        </Box>
                    </NodeDragWrapper>
                ))}
            </Box>
        </Box>
    );
};

export default NodeSelectorSidebar;

const NodeDragWrapper = ({ children, onDragStart }: { children: ReactNode; onDragStart: (event: DragEvent<HTMLDivElement>) => void }) => (
    <Box sx={{ mb: 1, cursor: 'grab' }} onDragStart={onDragStart} draggable>
        {children}
    </Box>
);
