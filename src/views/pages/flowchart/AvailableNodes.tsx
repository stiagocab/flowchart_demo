import React, { useMemo } from 'react';

// mui imports
import { Card, CardContent, useTheme, Box, Collapse, Stack, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import NodesNamesEnum from './customNodes/References';
import nodesCoditions, { INodeConditions } from './customNodes/conditions';
import { useCustomFlowContext } from './CustomFlowContext';

const GenericButtonGenerator = ({ label, nodeName }: { label: string; nodeName: NodesNamesEnum }) => {
    const { handleCreateNode } = useCustomFlowContext();

    return (
        <Button
            onClick={() => {
                handleCreateNode(nodeName);
            }}
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
        >
            <Typography>{label}</Typography>
        </Button>
    );
};

export default function AvailableNodes() {
    const theme = useTheme();
    const { selectedNode, setSelectedNode } = useCustomFlowContext();

    const nodeLabels: { [key: string]: string } = {
        [NodesNamesEnum.checker]: 'EVALUTE',
        [NodesNamesEnum.generator]: 'GENERATOR',
        [NodesNamesEnum.sender]: 'SEND EMAIL',
        [NodesNamesEnum.timer]: 'WAIT'
    };

    const renderNode = (nodeName: NodesNamesEnum): JSX.Element => {
        const nodeLabel: string = nodeLabels[nodeName];
        return <GenericButtonGenerator label={nodeLabel} nodeName={nodeName} />;
    };

    const currentNodeCondition = useMemo<INodeConditions | null>(() => {
        if (selectedNode?.data.isFinal) return null;
        return nodesCoditions.find((item) => item.nodeName === selectedNode?.type) ?? null;
    }, [selectedNode]);

    const isNodeSelected = selectedNode?.type !== null && Object.values(NodesNamesEnum).includes(selectedNode?.type as NodesNamesEnum);

    return (
        <Collapse in={isNodeSelected && !selectedNode?.data.isFinal}>
            <Card elevation={2} sx={{ width: 220, zIndex: 100, background: theme.palette.background.paper, p: 0 }}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: 1 }}>
                        <IconButton aria-label="Close" onClick={() => setSelectedNode(null)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <React.Fragment>
                        {currentNodeCondition &&
                            currentNodeCondition?.childrenNodesAllowed.map((childNode: NodesNamesEnum) => {
                                return (
                                    <Box sx={{ p: 1 }} key={`key-node-available-${childNode}`}>
                                        {renderNode(childNode)}
                                    </Box>
                                );
                            })}
                    </React.Fragment>
                </CardContent>
            </Card>
        </Collapse>
    );
    /* const nodeTypes = {
        [NodesNamesEnum.checker]: CheckerNode,
        [NodesNamesEnum.generator]: GeneratorNode,
        [NodesNamesEnum.sender]: SenderNode,
        [NodesNamesEnum.timer]: TimerNode
    };

    const renderNode = (nodeName: NodesNamesEnum) => {
        const NodeType = nodeTypes[nodeName];
        return <NodeType data={{}} />;
    };

    return (
        <Card elevation={2}>
            <CardContent>
                {nodesCoditions.map((nodeCondition) => {
                    const { nodeName, childrenNodesAllowed } = nodeCondition;
                    return (
                        <React.Fragment key={nodeName}>
                            {childrenNodesAllowed.map((childNode) => {
                                return renderNode(childNode);
                            })}
                        </React.Fragment>
                    );
                })}
            </CardContent>
        </Card>
    );*/
}
