import { useState, useCallback } from 'react';

import { XYPosition, Node } from 'reactflow';

import useFlowContext from '../hooks/useFlowContext';
import { useDragAndDropProps } from '../types/flow';
import { searchTargetNode, generateUUID, getBelowNode, replaceAnimatedEdge } from 'utils/helpers';
import NodesFlowEnum from '../types/NodesEnum';

export const useDragAndDrop = (): useDragAndDropProps => {
    const { setNodes, flowWrapper, flowInstance, setEdges, nodes, draggedNodeRef } = useFlowContext();
    const [targetDragNode, setTargetNode] = useState<Node | null>(null);

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            const reactFlowBounds = flowWrapper?.current?.getBoundingClientRect();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position: XYPosition = flowInstance?.project({
                x: event.clientX - (reactFlowBounds?.left ?? 50),
                y: event.clientY - (reactFlowBounds?.top ?? 50)
            }) ?? { x: 100, y: 100 };

            const newNode: Node = {
                id: `${type}-${generateUUID()}`,
                type,
                position,
                positionAbsolute: position,
                data: { label: `${type}` }
            };

            const belowNode = getBelowNode(nodes, newNode.position);

            if (belowNode && belowNode.type === NodesFlowEnum.skeleton && newNode.type !== NodesFlowEnum.skeleton) {
                // REPLACE
                setNodes((prevNodes: Node[]) => {
                    let nextNodes = prevNodes.map((n) => {
                        if (n.id === belowNode?.id) {
                            return { ...n, type: newNode.type };
                        }
                        return n;
                    });

                    return nextNodes;
                });

                setEdges((prevEdges) => replaceAnimatedEdge(prevEdges, belowNode?.id!));
            } else {
                // NEW NODES
                setNodes((nds) => nds.concat(newNode));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [flowInstance, setNodes, nodes]
    );

    const onNodeDrag = (_: any, node: Node) => {
        const newTarget = searchTargetNode({ node, nodes });
        setTargetNode(newTarget);
    };

    const onNodeDragStop = useCallback(
        (_: any, node: Node) => {
            setNodes((prevNodes: Node[]) => {
                let nextNodes = prevNodes.map((n) => {
                    if (n.id === targetDragNode?.id) {
                        return { ...n, type: node.type };
                    }
                    return n;
                });

                if (targetDragNode) {
                    nextNodes = nextNodes.filter((n) => n.id !== node.id);
                }
                return nextNodes;
            });

            setEdges((prevEdges) => replaceAnimatedEdge(prevEdges, targetDragNode?.id!));

            setTargetNode(null);
            draggedNodeRef.current = null;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [targetDragNode]
    );

    return { onDragOver, onDrop, onNodeDrag, onNodeDragStop };
};
