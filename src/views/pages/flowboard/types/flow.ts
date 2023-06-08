import React, { SetStateAction, Dispatch } from 'react';
import { Edge, Node, OnConnect, OnConnectStartParams, OnEdgesChange, OnNodesChange, Project, ReactFlowInstance } from 'reactflow';

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
};
