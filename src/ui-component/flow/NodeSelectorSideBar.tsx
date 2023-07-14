import React, { DragEvent, ReactNode } from 'react';

import { Box, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// hooks
import { useNodeCreator } from 'hooks/flowMethods';
import useFlowContext from 'hooks/useFlowContext';
import useNodesTypes from 'hooks/useNodesTypes';

// types
import NodesFlowEnum from 'types/NodesEnum';

const drawerWidth = '15%';
const minWidth = 130;
const maxWidth = 150;

const NodeSelectorSidebar = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
    const { createChildNode, replaceNode } = useNodeCreator();
    const { selectedNode } = useFlowContext();
    const { nodesSide } = useNodesTypes();

    const handleDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDoubleClick = (nodeType: NodesFlowEnum | string) => (e: React.MouseEvent<HTMLDivElement>) => {
        if (!nodeType) return null;
        if (selectedNode?.type === NodesFlowEnum.skeleton) {
            replaceNode(nodeType);
        } else {
            createChildNode(nodeType, e.currentTarget.children[0].clientWidth);
        }
    };

    return (
        <Box
            sx={{
                width: isOpen ? drawerWidth : 0,
                minWidth: isOpen ? minWidth : 0,
                maxWidth,
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
                {/* CUSTOM NODES */}
                {Object.entries(nodesSide).map(([nodeTypeKey, NodeType]) => {
                    const nodeName = nodeTypeKey as NodesFlowEnum;

                    const isAllow: boolean = true;

                    if (!isAllow) return null;

                    return (
                        <NodeDragWrapper
                            key={nodeTypeKey}
                            onDragStart={(event) => handleDragStart(event, nodeName)}
                            onDoubleClick={handleDoubleClick(nodeName)}
                        >
                            <NodeType data={{ hideHandle: true, origin: 'SIDE' as const }} />
                        </NodeDragWrapper>
                    );
                })}
                {/* DEFAULT  */}
                {/* {['input', 'output', 'default'].map((nodeType, index) => (
                    <NodeDragWrapper
                        key={`sidebar-node-${nodeType}-${index}`}
                        onDragStart={(event) => handleDragStart(event, nodeType)}
                        onDoubleClick={handleDoubleClick(nodeType)}
                    >
                        <Box sx={{ border: '2px solid white', p: 2, borderRadius: 1 }}>
                            <Typography sx={{ textAlign: 'center' }}>{nodeType.toUpperCase()}</Typography>
                        </Box>
                    </NodeDragWrapper>
                ))} */}
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
    onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => (
    <Box
        sx={{ mb: 1, p: 1, cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onDragStart={onDragStart}
        draggable
        onDoubleClick={onDoubleClick}
    >
        {children}
    </Box>
);
