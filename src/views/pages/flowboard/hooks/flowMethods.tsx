import { useCallback } from 'react';

import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    OnConnect,
    OnConnectStartParams,
    OnEdgesChange,
    OnNodesChange,
    XYPosition
} from 'reactflow';
import useFlowContext from '../hooks/useFlowContext';
import { useDragAndDropProps, useFlowChangesProps, useOnConnectProps } from '../types/flow';
import { generateUUID } from './helpers';
import NodesFlowEnum from '../types/NodesEnum';

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
                setEdges((eds) => eds.concat({ id: nodeId, source: connectingNodeId.current, target: nodeId }));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [project, setEdges, setNodes]
    );

    return { onConnect, onConnectStart, onConnectEnd };
};

export const useDragAndDrop = (): useDragAndDropProps => {
    const { setNodes, flowWrapper, flowInstance } = useFlowContext();

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

    return { onDragOver, onDrop };
};
