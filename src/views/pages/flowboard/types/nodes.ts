import { Node } from 'reactflow';
import NodesFlowEnum from './NodesEnum';

export interface INodeConditions {
    nodeName: NodesFlowEnum;
    couldBeInitial: boolean;
    coudlBeFinal: boolean;
    childrenNodesAllowed: NodesFlowEnum[];
    multilpleChildren: boolean;
    maxChildren?: number;
}

export interface INodesData extends Partial<INodeConditions> {
    hideHandle: boolean;
    origin: 'SIDE' | 'BOARD';
    label?: string;
    // group?: string;
}

export interface ICustomNodeProps extends Partial<Node> {
    data: INodesData;
}
