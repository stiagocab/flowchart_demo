import React, { createContext, ReactNode, useMemo, useState, useRef, useCallback } from 'react';

import { Edge, Node, ReactFlowInstance, useEdgesState, useNodesState, useReactFlow, useStoreApi } from 'reactflow';
import { FlowContextProps } from '../types/flow';
import flowSettings from '../settings';

// Create the FlowContext
export const FlowContext = createContext<FlowContextProps | undefined>(undefined);

const initialFlow: Node[] = [
    { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { parent: '', label: 'start', hideHandle: true } },
    { id: '2', type: 'default', position: { x: 100, y: 100 }, data: { parent: '', label: 'defa', hideHandle: true } }
    // { id: 'start', type: 'skeleton', position: { x: 100, y: 0 }, data: { parent: '', label: 'start', hideHandle: true } }
];

const initialEdge: Edge[] = [
    {
        id: '1',
        source: '1',
        target: '2',
        type: 'smoothstep',
        animated: true
    }
];

export const FlowContextProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
    const flowWrapper = useRef<HTMLDivElement>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const store = useStoreApi();

    const connectingNodeId = useRef<any>();

    const [nodes, setNodes] = useNodesState(initialFlow);
    const [edges, setEdges] = useEdgesState(initialEdge);

    const { project } = useReactFlow();

    const selectedNode: Node | null = useMemo<Node | null>(() => {
        if (!selectedNodeId) return null;
        return nodes.find((item) => item.id === selectedNodeId) ?? null;
    }, [nodes, selectedNodeId]);

    const openDrawerFromNode = useCallback((node?: Node | null) => {
        if (node) {
            // TODO: ADD RULES
        }

        setIsDrawerOpen(true);
    }, []);

    const openDrawer = useCallback(() => setIsDrawerOpen(true), []);

    const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

    // functions and data to return
    const contextValue: FlowContextProps = useMemo<FlowContextProps>(() => {
        const values: FlowContextProps = {
            nodes,
            edges,
            setFlowInstance,
            flowWrapper,
            flowInstance,
            setNodes,
            setEdges,
            connectingNodeId,
            project,
            selectedNode,
            setSelectedNodeId,
            isDrawerOpen,
            openDrawerFromNode,
            closeDrawer,
            openDrawer,
            store
        };
        return values;
    }, [
        edges,
        nodes,
        flowWrapper,
        setFlowInstance,
        project,
        setNodes,
        setEdges,
        connectingNodeId,
        flowInstance,
        selectedNode,
        setSelectedNodeId,
        isDrawerOpen,
        openDrawerFromNode,
        closeDrawer,
        openDrawer,
        store
    ]);

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};
