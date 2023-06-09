import React, { createContext, ReactNode, useMemo, useState, useRef, useCallback } from 'react';

import { Node, ReactFlowInstance, useEdgesState, useNodesState, useReactFlow } from 'reactflow';
import { FlowContextProps } from '../types/flow';

// Create the FlowContext
export const FlowContext = createContext<FlowContextProps | undefined>(undefined);

const initialFlow: Node[] = [
    { id: 'start', type: 'skeleton', position: { x: 100, y: 0 }, data: { parent: '', label: 'start', hideHandle: true } }
];

export const FlowContextProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
    const flowWrapper = useRef<HTMLDivElement>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const connectingNodeId = useRef<any>();

    const [nodes, setNodes] = useNodesState(initialFlow);
    const [edges, setEdges] = useEdgesState([]);

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
            openDrawer
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
        openDrawer
    ]);

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};
