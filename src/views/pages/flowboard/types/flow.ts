import React from 'react';
import { Edge, Node, OnConnect, OnConnectStartParams, OnEdgesChange, OnNodesChange } from 'reactflow';

export type FlowContextProps = {
    edges: Edge[];
    nodes: Node[];
    onConnect: OnConnect;
    onEdgesChange: OnEdgesChange;
    onNodesChange: OnNodesChange;
    setFlowInstance: React.Dispatch<React.SetStateAction<any>>;
    flowWrapper: React.RefObject<HTMLDivElement>;
    onDrop: (event: any) => void;
    onDragOver: (event: any) => void;
    onConnectStart: (event: any, params: OnConnectStartParams) => void;
    onConnectEnd: (event: MouseEvent | TouchEvent) => void;
};
