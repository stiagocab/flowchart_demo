import React, { useState, useCallback, createContext, ReactNode, useMemo, useEffect } from 'react';

import NodesNamesEnum from './customNodes/References';

import {
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    OnNodesChange,
    applyNodeChanges,
    applyEdgeChanges,
    OnEdgesChange,
    OnConnect,
    addEdge
} from 'reactflow';

export interface INodeData {
    parent: string;
    isFinal?: boolean;
    isInitial?: boolean;
    compact?: boolean;
    isInPanel?: boolean;
}

type UpdateNodeFn<T extends INodeData> = (dataNode: T) => void;

type CustomFlowContextProps = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    selectedNodetype: NodesNamesEnum | null;
    selectedNode: Node | null;
    setSelectedNode: (node: Node | null) => void;
    updateDataNode: UpdateNodeFn<INodeData>;
    handleCreateNode: (nodeName: NodesNamesEnum) => void;
};

const initialNodes: Node[] = [
    { id: 'start', position: { x: 100, y: 0 }, data: { parent: '', label: 'start' } },
    { id: 'node-1', type: 'generator', position: { x: 110, y: 100 }, data: { isFinal: false, parent: 'start' } }
    // { id: 'node-2', type: 'checker', position: { x: 110, y: 200 }, data: { isFinal: false, parent: 'node-1' } },
    // { id: 'node-3', type: 'timer', position: { x: 110, y: 300 }, data: { isFinal: false, parent: 'node-2' } },
    // { id: 'node-4', type: 'sender', position: { x: 110, y: 400 }, data: { isFinal: false, parent: 'node-4' } }
    // { id: 'node-1', type: 'checker', position: { x: 110, y: 100 }, data: { isFinal: false, isInitial: false } }
    // { id: 'node-2', type: 'timer', position: { x: 110, y: 200 }, data: { time: 10, scale: 'seconds' } },
    // { id: 'node-4', type: 'sender', position: { x: 110, y: 400 }, data: { time: 10, scale: 'seconds' } }
];

// const initialEdges: Edge[] = [];
const initialEdges: Edge[] = [{ id: 'e1-2', source: 'start', target: 'node-1' }];

// Create the context
export const CustomFlowContext = createContext<CustomFlowContextProps | undefined>(undefined);

// Create a custom hook to access the context
export const useCustomFlowContext = () => {
    const context = React.useContext(CustomFlowContext);
    if (!context) {
        throw new Error('useCustomFlowContext must be used within a CustomFlowContextProvider');
    }
    return context;
};

// Create the context provider component
export const CustomFlowContextProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const selectedNodetype = useMemo(() => {
        const nodeType = (selectedNode?.type as NodesNamesEnum) ?? null;
        return nodeType;
    }, [selectedNode]);

    const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);

    const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

    const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

    const updateDataNode = (dataNode: any) => {
        if (selectedNode) {
            const newNode: Node = {
                ...selectedNode,
                data: {
                    ...dataNode
                }
            };
            setSelectedNode(newNode);
        }

        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode?.id) {
                    node.data = {
                        ...dataNode
                    };
                }

                return node;
            })
        );
    };

    const handleCreateNode = (nodeName: NodesNamesEnum) => {
        const newUUID = generateUUID();
        const newNodeId = `node-${nodeName}-${newUUID}`;

        const newNode: Node = {
            id: newNodeId,
            position: generatePosition(selectedNode!),
            type: nodeName,
            data: {
                isFinal: false,
                parent: selectedNode?.id
            }
        };

        setNodes((nds) => [...nds, newNode]);

        const newEdge: Edge = {
            id: `edge-${nodeName}-${newUUID}`,
            // type: "",
            // animated: true,
            source: selectedNode?.id!,
            sourceHandle: 'source',
            target: newNodeId,
            targetHandle: 'target'
        };

        setEdges((eds) => [...eds, newEdge]);
    };

    useEffect(() => {
        console.log('nodes', nodes);
    }, [nodes]);

    const contextValue: CustomFlowContextProps = {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        selectedNode,
        setSelectedNode,
        selectedNodetype,
        updateDataNode,
        handleCreateNode
    };

    return <CustomFlowContext.Provider value={contextValue}>{children}</CustomFlowContext.Provider>;
};

function generatePosition(node: Node): { x: number; y: number } {
    return { x: node.position.x, y: node.position.y + 100 };
}

function generateUUID() {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
