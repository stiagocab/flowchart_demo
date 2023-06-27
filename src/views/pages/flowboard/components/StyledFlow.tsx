import React from 'react';

// mui imports
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';

// React flow
import ReactFlow, { Controls, Background, BackgroundVariant, MiniMap, Node, ConnectionMode } from 'reactflow';

// components
import ConnectionLine from './ConnectionLine';

// hooks
import useFlowContext from '../hooks/useFlowContext';
import useNodesTypes from '../hooks/useNodesTypes';
import { useFlowChanges, useNodeCreator, useOnConnect } from '../hooks/flowMethods';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import useSelection from '../hooks/useSelection';

// styles
import 'reactflow/dist/style.css';
import '../styles.css';

const ReactFlowStyled = styled(ReactFlow)(({ theme }) => ({
    backgroundColor: theme.palette.background.default
}));

export default function CustomFlow() {
    const theme = useTheme();
    const { nodes, edges, setFlowInstance, setSelectedNodeId, openDrawerFromNode, closeDrawer, openForm } = useFlowContext();

    const { onNodesChange, onEdgesChange } = useFlowChanges();
    const { onConnect, onConnectStart, onConnectEnd } = useOnConnect();
    const { onDrop, onDragOver, onNodeDrag, onNodeDragStop } = useDragAndDrop();
    const { onNodesDelete } = useNodeCreator();
    const { onSelectRightClick, RenderContextSelectionMenu, onNodeRightClick, RenderContextNodeMenu } = useSelection();

    const { nodesTypes } = useNodesTypes();

    const onNodeClick = (e: React.MouseEvent, node: Node) => {
        setSelectedNodeId(node.id);
        openDrawerFromNode(node);
        openForm();
    };

    const onPaneClick = (event: React.MouseEvent) => {
        closeDrawer();
        setSelectedNodeId(null);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <ReactFlowStyled
                connectionLineComponent={ConnectionLine}
                connectionMode={ConnectionMode.Strict}
                defaultEdgeOptions={{ type: 'smoothstep' }}
                edges={edges}
                elementsSelectable
                fitView
                nodes={nodes}
                nodeTypes={nodesTypes}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                onConnectStart={onConnectStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onEdgesChange={onEdgesChange}
                onInit={setFlowInstance}
                onNodeClick={onNodeClick}
                onNodeContextMenu={onNodeRightClick}
                onNodeDrag={onNodeDrag}
                onNodeDragStart={onNodeClick}
                onNodeDragStop={onNodeDragStop}
                onNodesChange={onNodesChange}
                onNodesDelete={onNodesDelete}
                onPaneClick={onPaneClick}
                onSelectionContextMenu={onSelectRightClick}
                panOnDrag={[2, 4]}
                panOnScroll
                selectionOnDrag
            >
                <MiniMapStyled
                    position="bottom-right"
                    style={{ boxShadow: theme.shadows[4], backgroundColor: theme.palette.background.default, borderRadius: 5 }}
                />
                <Controls />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                {RenderContextSelectionMenu}
                {RenderContextNodeMenu}
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
