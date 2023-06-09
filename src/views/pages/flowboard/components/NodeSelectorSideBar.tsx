import { DragEvent, ReactNode } from 'react';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SkeletonNode from '../nodes/SkeletonNode';
import NodesFlowEnum from '../types/NodesEnum';
import { useNodeCreator } from '../hooks/flowMethods';
import useFlowContext from '../hooks/useFlowContext';

const drawerWidth = '20%';
const mixWidth = 150;

const NodeSelectorSidebar = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
    const { createChildNode, replaceNode } = useNodeCreator();
    const { selectedNode } = useFlowContext();

    const handleDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDoubleClick = (nodeType: NodesFlowEnum | string) => {
        if (selectedNode?.type === NodesFlowEnum.skeleton) {
            replaceNode(nodeType);
        } else {
            createChildNode(nodeType);
        }
    };

    return (
        <Box
            sx={{
                width: isOpen ? drawerWidth : 0,
                minWidth: isOpen ? mixWidth : 0,
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
                <NodeDragWrapper
                    onDragStart={(event) => handleDragStart(event, NodesFlowEnum.skeleton)}
                    onDoubleClick={() => handleDoubleClick(NodesFlowEnum.skeleton)}
                >
                    <SkeletonNode data={{ hideHandle: true, origin: 'SIDE' as const }} />
                </NodeDragWrapper>

                {['input', 'output', 'default'].map((nodeType, index) => (
                    <NodeDragWrapper
                        key={`sidebar-node-${nodeType}-${index}`}
                        onDragStart={(event) => handleDragStart(event, nodeType)}
                        onDoubleClick={() => handleDoubleClick(nodeType)}
                    >
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

const NodeDragWrapper = ({
    children,
    onDragStart,
    onDoubleClick
}: {
    children: ReactNode;
    onDragStart: (event: DragEvent<HTMLDivElement>) => void;
    onDoubleClick: () => void;
}) => (
    <Box sx={{ mb: 1, cursor: 'grab' }} onDragStart={onDragStart} draggable onDoubleClick={onDoubleClick}>
        {children}
    </Box>
);
