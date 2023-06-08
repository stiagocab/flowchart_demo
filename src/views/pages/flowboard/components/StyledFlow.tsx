import React from 'react';

// mui imports
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';

// React flow
import ReactFlow, { Controls, Background, BackgroundVariant, MiniMap } from 'reactflow';

// styles
import 'reactflow/dist/style.css';
import useFlowContext from '../hooks/useFlowContext';
import useNodesTypes from '../hooks/useNodesTypes';

const ReactFlowStyled = styled(ReactFlow)(({ theme }) => ({
    backgroundColor: theme.palette.background.default
}));

export default function CustomFlow() {
    const theme = useTheme();
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setFlowInstance, onDrop, onDragOver } = useFlowContext();
    const nodeTypes = useNodesTypes();

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <ReactFlowStyled
                elementsSelectable
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                onInit={setFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <MiniMapStyled
                    position="bottom-right"
                    style={{ boxShadow: theme.shadows[4], backgroundColor: theme.palette.background.default, borderRadius: 5 }}
                />
                <Controls />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlowStyled>
        </Box>
    );
}

const MiniMapStyled = styled(MiniMap)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,

    overflow: 'hidden',
    '& .react-flow__minimap-mask': {
        fill: theme.palette.background.paper
    },
    '& .react-flow__minimap-node': {
        fill: theme.palette.secondary.main
    }
}));

// ".react-flow__minimap-mask" {
//     fill: ${(props) => props.theme.minimapMaskBg},
// },

// ".react-flow__minimap-node" {
//     fill: ${(props) => props.theme.nodeBg},
//     stroke: none;
// }
