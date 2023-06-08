import React, { createContext, useCallback, ReactNode, useMemo, useState, useRef } from 'react';

import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Node,
    OnConnect,
    OnConnectStartParams,
    OnEdgesChange,
    OnNodesChange,
    ReactFlowInstance,
    useEdgesState,
    useNodesState,
    useReactFlow,
    XYPosition
} from 'reactflow';
import { FlowContextProps } from '../types/flow';
import { generateUUID } from '../hooks/helpers';
import NodesFlowEnum from '../types/NodesEnum';

// Create the FlowContext
export const FlowContext = createContext<FlowContextProps | undefined>(undefined);

const initialFlow: Node[] = [
    { id: 'start', type: 'skeleton', position: { x: 100, y: 0 }, data: { parent: '', label: 'start', hideHandle: true } }
    // { id: '1', position: { x: 100, y: 100 }, data: { parent: '', label: 'second' } },
    // { id: '2', position: { x: 250, y: 100 }, data: { parent: '', label: 'third' } }
];

export const FlowContextProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
    const flowWrapper = useRef<HTMLDivElement>(null);

    const connectingNodeId = useRef<any>();

    const [nodes, setNodes] = useNodesState(initialFlow);
    const [edges, setEdges] = useEdgesState([]);

    const { project } = useReactFlow();

    const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);

    const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

    const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

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
        [flowInstance, setNodes]
    );

    const onConnectStart = useCallback((_: any, { nodeId }: OnConnectStartParams) => {
        connectingNodeId.current = nodeId;
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
        [project, setEdges, setNodes]
    );

    // functions and data to return
    const contextValue: FlowContextProps = useMemo<FlowContextProps>(() => {
        const values: FlowContextProps = {
            nodes,
            edges,
            onNodesChange,
            onEdgesChange,
            onConnect,
            setFlowInstance,
            flowWrapper,
            onDrop,
            onDragOver,
            onConnectStart,
            onConnectEnd
        };
        return values;
    }, [
        edges,
        nodes,
        onConnect,
        onEdgesChange,
        onNodesChange,
        flowWrapper,
        setFlowInstance,
        onDrop,
        onDragOver,
        onConnectStart,
        onConnectEnd
    ]);

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};
