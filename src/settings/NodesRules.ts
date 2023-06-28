import NodesFlowEnum from 'types/NodesEnum';
import { INodeConditions } from 'types/nodes';

const nodesRules: INodeConditions[] = [
    {
        nodeName: NodesFlowEnum.skeleton,
        couldBeInitial: false,
        coudlBeFinal: false,
        childrenNodesAllowed: [NodesFlowEnum.dot, NodesFlowEnum.square, NodesFlowEnum.triangle],
        multilpleChildren: false
    },
    {
        nodeName: NodesFlowEnum.dot,
        couldBeInitial: true,
        coudlBeFinal: true,
        childrenNodesAllowed: [NodesFlowEnum.dot, NodesFlowEnum.square, NodesFlowEnum.skeleton],
        multilpleChildren: true,
        maxChildren: 2
    },
    {
        nodeName: NodesFlowEnum.square,
        couldBeInitial: true,
        coudlBeFinal: true,
        childrenNodesAllowed: [NodesFlowEnum.dot, NodesFlowEnum.square, NodesFlowEnum.skeleton, NodesFlowEnum.triangle],
        multilpleChildren: true,
        maxChildren: 1
    },
    {
        nodeName: NodesFlowEnum.triangle,
        couldBeInitial: true,
        coudlBeFinal: true,
        childrenNodesAllowed: [NodesFlowEnum.dot, NodesFlowEnum.square, NodesFlowEnum.skeleton, NodesFlowEnum.triangle],
        multilpleChildren: true,
        maxChildren: 1
    }
];

export default nodesRules;
