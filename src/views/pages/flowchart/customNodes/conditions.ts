import NodesNamesEnum from './References';

export interface INodeConditions {
    nodeName: NodesNamesEnum;
    couldBeInitial: boolean;
    coudlBeFinal: boolean;
    childrenNodesAllowed: NodesNamesEnum[];
    multilpleChildren: boolean;
    maxChildren?: number;
}

const nodesCoditions: INodeConditions[] = [
    {
        nodeName: NodesNamesEnum.checker,
        multilpleChildren: true,
        coudlBeFinal: false,
        couldBeInitial: true,
        childrenNodesAllowed: [NodesNamesEnum.checker, NodesNamesEnum.generator]
    },
    {
        nodeName: NodesNamesEnum.timer,
        multilpleChildren: false,
        coudlBeFinal: false,
        couldBeInitial: false,
        childrenNodesAllowed: [NodesNamesEnum.checker, NodesNamesEnum.generator, NodesNamesEnum.sender]
    },
    {
        nodeName: NodesNamesEnum.generator,
        multilpleChildren: true,
        maxChildren: 2,
        coudlBeFinal: true,
        couldBeInitial: true,
        childrenNodesAllowed: [NodesNamesEnum.checker, NodesNamesEnum.generator, NodesNamesEnum.sender, NodesNamesEnum.timer]
    },
    {
        nodeName: NodesNamesEnum.sender,
        multilpleChildren: false,
        maxChildren: 2,
        coudlBeFinal: true,
        couldBeInitial: false,
        childrenNodesAllowed: [NodesNamesEnum.checker, NodesNamesEnum.generator, NodesNamesEnum.sender, NodesNamesEnum.timer]
    }
];

export default nodesCoditions;
