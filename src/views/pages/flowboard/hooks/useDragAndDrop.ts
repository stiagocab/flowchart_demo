import { useState, useCallback } from 'react';

import { XYPosition, Node, useReactFlow } from 'reactflow';

import useFlowContext from '../hooks/useFlowContext';
import { useDragAndDropProps } from '../types/flow';
import { searchTargetNode, generateUUID, getBelowNode } from './helpers';
import NodesFlowEnum from '../types/NodesEnum';

export const useDragAndDrop = (): useDragAndDropProps => {
    const { setNodes, flowWrapper, flowInstance, setEdges, nodes, draggedNodeRef } = useFlowContext();
    const [targetDragNode, setTargetNode] = useState<Node | null>(null);
    const { getIntersectingNodes } = useReactFlow();

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

            console.log('newNode', newNode);

            const newTarget = searchTargetNode({ node: newNode, nodes });
            setTargetNode(newTarget);

            // console.log('newTarget', newTarget);

            const belowNode = getBelowNode(nodes, newNode.position);

            console.log('belowNode', belowNode);

            if (belowNode && belowNode.type === NodesFlowEnum.skeleton) {
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
            } else {
                // NEW NODES
                setNodes((nds) => nds.concat(newNode));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [flowInstance, setNodes, nodes]
    );

    // const getClosestEdge = useCallback(
    //     (node: Node) => {
    //         const { nodeInternals } = store.getState();
    //         const storeNodes = Array.from(nodeInternals.values());

    //         const closestNode = storeNodes.reduce(
    //             (res: { distance: number; node: Node | null }, n) => {
    //                 if (n && n.positionAbsolute && node.positionAbsolute && n.id !== node.id) {
    //                     const dx = n.positionAbsolute.x - node.positionAbsolute.x;
    //                     const dy = n.positionAbsolute.y - node.positionAbsolute.y;
    //                     const d = Math.sqrt(dx * dx + dy * dy);

    //                     if (d < res.distance && d < flowSettings.minDistance) {
    //                         res.distance = d;
    //                         res.node = n;
    //                     }
    //                 }

    //                 return res;
    //             },
    //             {
    //                 distance: Number.MAX_VALUE,
    //                 node: null
    //             }
    //         );

    //         if (!closestNode.node) {
    //             return null;
    //         }

    //         const closeNodeIsSource = closestNode.node.positionAbsolute?.x! < node.positionAbsolute?.x!;

    //         return {
    //             id: `${node.id}-${closestNode.node.id}`,
    //             source: closeNodeIsSource ? closestNode.node.id : node.id,
    //             target: closeNodeIsSource ? node.id : closestNode.node.id
    //         };
    //     },
    //     [store]
    // );

    const onNodeDrag = (_: any, node: Node) => {
        const newTarget = searchTargetNode({ node, nodes });
        setTargetNode(newTarget);

        const intersections = getIntersectingNodes(node).map((n) => n.id);
        console.log('intersections', intersections);
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

            setEdges((prevEdges) => {
                const nextEdges = prevEdges.map((e) => {
                    if (e.animated && e.target === targetDragNode?.id) {
                        return { ...e, animated: false };
                    }

                    return e;
                });
                return nextEdges;
            });

            setTargetNode(null);
            draggedNodeRef.current = null;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [targetDragNode]
    );

    return { onDragOver, onDrop, onNodeDrag, onNodeDragStop };
};
