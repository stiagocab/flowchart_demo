import { useCallback } from 'react';

import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    OnConnect,
    OnConnectStartParams,
    OnEdgesChange,
    OnNodesChange,
    getRectOfNodes,
    Node,
    getOutgoers,
    Edge,
    getIncomers,
    getConnectedEdges
} from 'reactflow';

import useFlowContext from '../hooks/useFlowContext';
import { generatePosition, generateUUID } from '../utils/helpers';
import NodesFlowEnum from '../types/NodesEnum';
import { useNodeCreatorProps, useFlowChangesProps, useOnConnectProps } from 'types/flow';

export const useFlowChanges = (): useFlowChangesProps => {
    const { setNodes, setEdges } = useFlowContext();

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => {
            setNodes((prevNodes) => applyNodeChanges(changes, prevNodes));
        },
        [setNodes]
    );

    const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

    return { onNodesChange, onEdgesChange };
};

export const useOnConnect = (): useOnConnectProps => {
    const { setNodes, setEdges, connectingNodeId, project, flowWrapper } = useFlowContext();

    const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

    const onConnectStart = useCallback((_: any, { nodeId }: OnConnectStartParams) => {
        connectingNodeId.current = nodeId;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onConnectEnd = useCallback(
        (event: any) => {
            // (event: MouseEvent | TouchEvent) => {
            const targetIsPanel = event.target.classList.contains('react-flow__pane');
            if (targetIsPanel) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const { top, left } = flowWrapper?.current?.getBoundingClientRect() ?? { left: 0, top: 0 };

                const nodeId = `${NodesFlowEnum.skeleton}-${generateUUID()}`;

                const newNode = {
                    id: nodeId,
                    type: NodesFlowEnum.skeleton,
                    // TODO: COPY THE POSITION OF PARENT
                    // set in center if is the first child
                    // align if has multiple childs
                    position: project({ x: event.clientX - left, y: event.clientY - top }),
                    data: {}
                };
                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) => eds.concat({ id: nodeId, source: connectingNodeId.current, target: nodeId, animated: true }));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [project, setEdges, setNodes]
    );

    return { onConnect, onConnectStart, onConnectEnd };
};

export const useNodeCreator = (): useNodeCreatorProps => {
    const { setNodes, setEdges, selectedNode, nodes, edges } = useFlowContext();

    const createChildNode = (nodeType: NodesFlowEnum | string, newNodeWidth?: number) => {
        const newUUID = generateUUID();

        const newNodeId = `node-${nodeType}-${newUUID}`;

        const newNode: Node = {
            id: newNodeId,
            position: generatePosition(selectedNode!, newNodeWidth),
            type: nodeType,
            data: {
                isFinal: false,
                parent: selectedNode?.id,
                label: `${nodeType.toUpperCase()}`
            }
        };

        const nodeRect = getRectOfNodes([selectedNode!, newNode]);
        const parenNodeChildren = getOutgoers(selectedNode!, nodes, edges)?.length;

        newNode.position = {
            x: nodeRect.x + parenNodeChildren * 80,
            y: newNode.position.y
        };

        setNodes((nds) => [...nds, newNode]);

        const newEdge: Edge = {
            id: `edge-${nodeType}-${newUUID}`,
            source: selectedNode?.id!,
            sourceHandle: 'source',
            target: newNodeId,
            targetHandle: 'target',
            animated: nodeType === NodesFlowEnum.skeleton
            // type: 'smoothstep'
        };

        setEdges((eds) => [...eds, newEdge]);
    };

    const replaceNode = (nodeType: NodesFlowEnum | string) => {
        const updateData: Node = {
            id: selectedNode?.id!,
            position: selectedNode?.position!,
            type: nodeType,
            data: {
                isFinal: false,
                label: `${nodeType.toUpperCase()}`
            }
        };

        setNodes((nds) => [
            ...nds.map((itemNode: Node) => {
                if (itemNode.id === updateData.id) {
                    return { ...updateData };
                }
                return { ...itemNode };
            })
        ]);

        setEdges((eds) => [
            ...eds.map((item) => {
                if (item.target === updateData.id) {
                    return { ...item, animated: false };
                }
                return item;
            })
        ]);
    };

    const onNodesDelete = useCallback(
        (deleted: Node[]) => {
            setEdges(
                deleted.reduce((acc, node: Node) => {
                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter((edge: Edge) => !connectedEdges.includes(edge));

                    const createdEdges = incomers.flatMap(({ id: source }) =>
                        outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
                    );

                    return [...remainingEdges, ...createdEdges];
                }, edges)
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [nodes, edges]
    );

    return { createChildNode, replaceNode, onNodesDelete };
};