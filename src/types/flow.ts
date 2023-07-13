import React, { SetStateAction, Dispatch } from 'react';
import {
    Edge,
    Node,
    OnConnect,
    OnConnectStartParams,
    OnEdgesChange,
    OnNodesChange,
    OnSelectionChangeParams,
    Project,
    ReactFlowInstance,
    ReactFlowState
} from 'reactflow';
import NodesFlowEnum from './NodesEnum';

export type FlowContextProps = {
    connectingNodeId: React.MutableRefObject<any>;
    edges: Edge[];
    flowInstance: ReactFlowInstance | null;
    flowWrapper: React.RefObject<HTMLDivElement>;
    nodes: Node[];
    project: Project;
    setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
    setFlowInstance: React.Dispatch<React.SetStateAction<any>>;
    setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>;
    selectedNode: Node | null;
    setSelectedNodeId: React.Dispatch<React.SetStateAction<string | number | null>>;
    isDrawerOpen: boolean;
    openDrawerFromNode: (node?: Node | null) => void;
    closeDrawer: () => void;
    openDrawer: () => void;
    formIsOpen: boolean;
    openForm: () => void;
    closeForm: () => void;
    onNodeDragStart: (event: any, node: Node) => void;
    draggedNodeRef: React.MutableRefObject<Node | null>;
    store: {
        getState: () => ReactFlowState;
        setState: (
            partial: ReactFlowState | Partial<ReactFlowState> | ((state: ReactFlowState) => ReactFlowState | Partial<ReactFlowState>),
            replace?: boolean | undefined
        ) => void;
        subscribe: (listener: (state: ReactFlowState, prevState: ReactFlowState) => void) => () => void;
        destroy: () => void;
    };
};

export type useFlowChangesProps = {
    onEdgesChange: OnEdgesChange;
    onNodesChange: OnNodesChange;
};

export type useOnConnectProps = {
    onConnect: OnConnect;
    onConnectEnd: (event: any) => void;
    onConnectStart: (event: any, params: OnConnectStartParams) => void;
};

export type useDragAndDropProps = {
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    onNodeDrag: (event: any, node: Node) => void;
    onNodeDragStop: (event: any, node: Node) => void;
};

export type useSelectionProps = {
    // onSelect: (params: OnSelectionChangeParams) => void;
    onSelectRightClick: (event: React.MouseEvent<Element, MouseEvent>, nodes: Node[]) => void;
    RenderContextSelectionMenu: JSX.Element;
    RenderContextNodeMenu: JSX.Element;
    onNodeRightClick: (event: React.MouseEvent<Element, MouseEvent>, node: Node) => void;
};

export type useNodeCreatorProps = {
    createChildNode: (nodeType: NodesFlowEnum | string, newNodeWidth?: number) => void;
    replaceNode: (nodeType: NodesFlowEnum | string) => void;
    onNodesDelete: (deleted: Node[]) => void;
};

export type WorkspacesType = {
    id: number;
    name: string;
    description: string;
    components: {
        config: {
            name: string;
            description: string;
            type: string;
            params: { [key: string]: any }[];
        };
        input?: string;
        nextId?: string;
        prevId?: string;
    }[];
};
