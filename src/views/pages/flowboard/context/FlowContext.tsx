import React, { createContext, ReactNode, useMemo, useState, useRef } from 'react';

import { Node, ReactFlowInstance, useEdgesState, useNodesState, useReactFlow } from 'reactflow';
import { FlowContextProps } from '../types/flow';

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
            project
        };
        return values;
    }, [edges, nodes, flowWrapper, setFlowInstance, project, setNodes, setEdges, connectingNodeId, flowInstance]);

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};
