import React, { createContext, useCallback, ReactNode, useMemo, useState, useRef, Dispatch, SetStateAction, RefObject } from 'react';

import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    ReactFlowInstance,
    useEdgesState,
    useNodesState,
    XYPosition
} from 'reactflow';

type FlowContextType = {
    edges: Edge[];
    nodes: Node[];
    onConnect: OnConnect;
    onEdgesChange: OnEdgesChange;
    onNodesChange: OnNodesChange;
    setFlowInstance: Dispatch<SetStateAction<any>>;
    flowWrapper: RefObject<HTMLDivElement>;
    onDrop: (event: any) => void;
    onDragOver: (event: any) => void;
};

// Create the FlowContext
export const FlowContext = createContext<FlowContextType | undefined>(undefined);

const initialFlow: Node[] = [
    { id: 'start', type: 'skeleton', position: { x: 100, y: 0 }, data: { parent: '', label: 'start' } },
    { id: '1', position: { x: 100, y: 100 }, data: { parent: '', label: 'second' } },
    { id: '2', position: { x: 200, y: 100 }, data: { parent: '', label: 'third' } }
];

export const FlowContextProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
    const flowWrapper = useRef<HTMLDivElement>(null);

    const [nodes, setNodes] = useNodesState(initialFlow);
    const [edges, setEdges] = useEdgesState([]);

    const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);

    const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

    const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

    let id = 0;
    const getId = () => `dndnode_${id++}`;

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
                id: getId(),
                type,
                position,
                data: { label: `${type} node` }
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [flowInstance]
    );

    // functions and data to return
    const contextValue: FlowContextType = useMemo<FlowContextType>(() => {
        const values: FlowContextType = {
            nodes,
            edges,
            onNodesChange,
            onEdgesChange,
            onConnect,
            setFlowInstance,
            flowWrapper,
            onDrop,
            onDragOver
        };
        return values;
    }, [edges, nodes, onConnect, onEdgesChange, onNodesChange, flowWrapper, setFlowInstance, onDrop, onDragOver]);

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};
