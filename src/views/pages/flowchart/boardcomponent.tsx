import React, { useMemo } from 'react';

import { Box, Typography } from '@mui/material';

import ReactFlow, { Controls, Background, Node, NodeTypes, BackgroundVariant, Panel } from 'reactflow';

import 'reactflow/dist/style.css';
import NodesNamesEnum from './customNodes/References';
import CheckerNode from './customNodes/TextUpdaterNode';
import GeneratorNode from './customNodes/Generator';
import SenderNode from './customNodes/SenderNode';
import TimerNode from './customNodes/TimerNode';
import { useCustomFlowContext } from './CustomFlowContext';
import AvailableNodes from './AvailableNodes';

export default function BoardComponent() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setSelectedNode } = useCustomFlowContext();

    const nodeTypes: NodeTypes = useMemo(
        () => ({
            [`${NodesNamesEnum.checker as string}`]: CheckerNode,
            [`${NodesNamesEnum.generator as string}`]: GeneratorNode,
            [`${NodesNamesEnum.sender as string}`]: SenderNode,
            [`${NodesNamesEnum.timer as string}`]: TimerNode
        }),
        []
    );

    const handleOnNodeClick = (e: React.MouseEvent, node: Node) => {
        console.log('NODE', node);
        setSelectedNode(node);
    };

    return (
        <Box style={{ width: '100%', height: '600px' }}>
            <ReactFlow
                elementsSelectable
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                // onPaneClick={() => setSelectedNode(null)}
                onNodeClick={handleOnNodeClick}
            >
                <Controls />
                <Panel position="top-left">
                    <AvailableNodes />
                </Panel>
                <Background style={{ zIndex: 2 }} variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </Box>
    );
}
