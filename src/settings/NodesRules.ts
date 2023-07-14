import NodesFlowEnum from 'types/NodesEnum';
import { INodeConditions } from 'types/nodes';

const nodesRules: Record<NodesFlowEnum | string, INodeConditions> = {
    [`${NodesFlowEnum.choice}`]: {
        nodeName: NodesFlowEnum.skeleton,
        couldBeInitial: true,
        coudlBeFinal: false,
        maxChildConnections: 2,
        maxParentConnections: 1
    },
    [`${NodesFlowEnum.parallel}`]: {
        nodeName: NodesFlowEnum.parallel,
        couldBeInitial: true,
        coudlBeFinal: false,
        maxParentConnections: 2,
        maxChildConnections: 2
    },
    [`${NodesFlowEnum.pass}`]: {
        nodeName: NodesFlowEnum.pass,
        couldBeInitial: true,
        coudlBeFinal: false,
        maxChildConnections: 1,
        maxParentConnections: 1
    },
    [`${NodesFlowEnum.task}`]: {
        nodeName: NodesFlowEnum.task,
        couldBeInitial: true,
        coudlBeFinal: false,
        maxChildConnections: 1,
        maxParentConnections: 1
    },
    [`${NodesFlowEnum.skeleton}`]: {
        nodeName: NodesFlowEnum.skeleton,
        couldBeInitial: true,
        coudlBeFinal: false,
        maxParentConnections: Infinity,
        maxChildConnections: 0
    },
    [`Final`]: {
        nodeName: 'Final',
        coudlBeFinal: true,
        couldBeInitial: false,
        maxParentConnections: Infinity,
        maxChildConnections: 0
    }
};

export default nodesRules;
