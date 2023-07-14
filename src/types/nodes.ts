import { Node } from 'reactflow';
import NodesFlowEnum from './NodesEnum';

export type FlowNodeType = Node & {
    type: NodesFlowEnum | string;
    data: {
        label: string;
        children: string[];
        parent?: string | null;
    };
};

export interface INodeConditions {
    nodeName: NodesFlowEnum | string;
    couldBeInitial: boolean;
    coudlBeFinal: boolean;
    maxParentConnections: number; // -1 to infinity
    maxChildConnections: number;
    // isConnectable: true;
    // childrenNodesAllowed: NodesFlowEnum[];
    // multilpleChildren: boolean;
    // maxChildren?: number;
}

export interface INodesData extends Partial<INodeConditions> {
    hideHandle: boolean;
    origin: 'SIDE' | 'BOARD';
    label?: string;
    groupId?: string | undefined;
}

export interface ICustomNodeProps extends Partial<Node> {
    data: INodesData;
}
