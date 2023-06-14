import { useCallback } from 'react';

import { XYPosition, Node } from 'reactflow';

import useFlowContext from '../hooks/useFlowContext';
import { useDragAndDropProps } from '../types/flow';
import { generateUUID } from './helpers';
import flowSettings from '../settings';

export const useDragAndDrop = (): useDragAndDropProps => {
    const { setNodes, flowWrapper, flowInstance, store, setEdges } = useFlowContext();

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

            const newNode = {
                id: `${type}-${generateUUID()}`,
                type,
                position,
                data: { label: `${type} node` }
            };

            setNodes((nds) => nds.concat(newNode));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [flowInstance, setNodes]
    );

    const getClosestEdge = useCallback(
        (node: Node) => {
            const { nodeInternals } = store.getState();
            const storeNodes = Array.from(nodeInternals.values());

            const closestNode = storeNodes.reduce(
                (res: { distance: number; node: Node | null }, n) => {
                    if (n && n.positionAbsolute && node.positionAbsolute && n.id !== node.id) {
                        const dx = n.positionAbsolute.x - node.positionAbsolute.x;
                        const dy = n.positionAbsolute.y - node.positionAbsolute.y;
                        const d = Math.sqrt(dx * dx + dy * dy);

                        if (d < res.distance && d < flowSettings.minDistance) {
                            res.distance = d;
                            res.node = n;
                        }
                    }

                    return res;
                },
                {
                    distance: Number.MAX_VALUE,
                    node: null
                }
            );

            if (!closestNode.node) {
                return null;
            }

            const closeNodeIsSource = closestNode.node.positionAbsolute?.x! < node.positionAbsolute?.x!;

            return {
                id: `${node.id}-${closestNode.node.id}`,
                source: closeNodeIsSource ? closestNode.node.id : node.id,
                target: closeNodeIsSource ? node.id : closestNode.node.id
            };
        },
        [store]
    );

    const onNodeDrag = useCallback(
        (event: any, node: Node) => {
            const closeEdge: { [key: string]: any } | null = getClosestEdge(node);

            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (closeEdge && !nextEdges.find((ne) => ne.source === closeEdge.source && ne.target === closeEdge.target)) {
                    // console.log('CLOSE', closeEdge);
                    closeEdge.className = 'temp';
                    // nextEdges.push(closeEdge);
                }

                return nextEdges;
            });
        },
        [getClosestEdge]
    );

    const onNodeDragStop = useCallback(
        (_: any, node: Node) => {
            const closeEdge = getClosestEdge(node);

            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                const existEdge = es.every((e) => e.id !== closeEdge?.id);

                if (closeEdge && existEdge) {
                    nextEdges.push(closeEdge);
                }

                return nextEdges;
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getClosestEdge]
    );

    return { onDragOver, onDrop, onNodeDrag, onNodeDragStop };
};
