/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactNode, useMemo, useState, useRef, useCallback, useEffect } from 'react';

import { Edge, Node, ReactFlowInstance, useEdgesState, useNodesState, useReactFlow, useStoreApi } from 'reactflow';
import NodesFlowEnum from '../types/NodesEnum';
import { FlowContextProps } from 'types/flow';
import { getWorkspace } from 'sampleData';
import { useParams } from 'react-router-dom';
import { generateUUID } from 'utils/helpers';
import { transformComponentsToNodes } from 'utils/transform';
import { IWorkspace } from 'types/workspace';

// Create the FlowContext
export const FlowContext = createContext<FlowContextProps | undefined>(undefined);

export const FlowContextProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
    const store = useStoreApi();

    // hooks - refs
    const draggedNodeRef = useRef<Node | null>(null);
    const flowWrapper = useRef<HTMLDivElement>(null);

    const connectingNodeId = useRef<any>();

    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    // params
    const { workspaceId } = useParams();

    const [workspace, setWorkspace] = useState<IWorkspace | Omit<IWorkspace, 'id'>>(initialWorkspace());

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

    // COMPONENTS DRAWER
    const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
    const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

    // FORMS DRAWER
    const closeForm = useCallback(() => {
        setFormIsOpen(false);
        setSelectedNodeId(null);
    }, []);
    const openForm = useCallback(() => setFormIsOpen(true), []);

    const onNodeDragStart = (evt: any, node: Node) => {
        draggedNodeRef.current = node;
    };

    useEffect(() => {
        if (workspaceId) {
            getWorkspace(workspaceId).then((resp) => {
                setWorkspace(resp);
                const newData = transformComponentsToNodes(resp);
                setNodes(newData.nodes);
                setEdges(newData.edges);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workspaceId]);

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
            store,
            onNodeDragStart,
            draggedNodeRef,
            formIsOpen,
            closeForm,
            openForm
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
        store,
        formIsOpen,
        closeForm,
        openForm
    ]);

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};

const initialWorkspace = (): Omit<IWorkspace, 'id'> => ({
    name: `Workspace ${generateUUID()}`,
    description: '',
    components: []
});

// const initialFlow: Node[] = [
//     { id: '1', type: NodesFlowEnum.dot, position: { x: 0, y: 0 }, data: { parent: '', label: 'AA', hideHandle: false } },
//     { id: '2', type: NodesFlowEnum.square, position: { x: -10, y: 100 }, data: { parent: '', label: 'A1', hideHandle: false } },
//     {
//         id: '3',
//         type: NodesFlowEnum.dot,
//         position: { x: -10, y: 200 },
//         data: { parent: '', label: 'A2', hideHandle: false }
//     },
//     {
//         id: '4',
//         type: NodesFlowEnum.skeleton,
//         position: { x: -10, y: 300 },
//         data: { parent: '', label: 'A3', hideHandle: false }
//     },
//     {
//         id: '5',
//         type: NodesFlowEnum.triangle,
//         position: { x: 100, y: 300 },
//         data: { parent: '', label: 'A3', hideHandle: false }
//     }
//     // { id: '5', type: NodesFlowEnum.dot, position: { x: 240, y: 40 }, parentNode: '1', data: { parent: '', label: 'A4', hideHandle: false } }
//     // { id: 'start', type: 'skeleton', position: { x: 100, y: 0 }, data: { parent: '', label: 'start', hideHandle: true } }
// ];

// const initialEdge: Edge[] = [
//     {
//         id: '1',
//         source: '1',
//         target: '2',
//         type: 'smoothstep',
//         animated: false
//     },
//     {
//         id: '2',
//         source: '2',
//         target: '3',
//         type: 'smoothstep',
//         animated: false
//     },
//     {
//         id: '3',
//         source: '3',
//         target: '5',
//         type: 'smoothstep',
//         animated: false
//     },
//     {
//         id: '4',
//         source: '3',
//         target: '4',
//         type: 'smoothstep',
//         animated: true
//     }
// ];

// creación: POST https://{{host}}/api/{{workspace}}/workflows
// busqueda: GET https://{{host}}/api/{{workspace}}/workflows
// https://{{host}}/api/{{workspace}}/workflows/{{workflowId}}
// Actualizacion: PATCH https://{{host}}/api/{{workspace}}/workflows/{{workflowId}}
