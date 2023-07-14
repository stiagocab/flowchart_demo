import { ComponentType, useMemo } from 'react';

import { NodeTypes } from 'reactflow';

// enum
import NodesFlowEnum from 'types/NodesEnum';

// nodes
import ChoiceNode from 'nodes/ChoiceNode';
import ParallelNode from 'nodes/ParallelNode';
import PassNode from 'nodes/PassNode';
import TaskNode from 'nodes/TaskNode';
import SkeletonNode from 'nodes/SkeletonNode';

export default function useNodesTypes() {
    const nodesTypes: NodeTypes = useMemo(
        () => ({
            [NodesFlowEnum.choice]: ChoiceNode,
            [NodesFlowEnum.parallel]: ParallelNode,
            [NodesFlowEnum.pass]: PassNode,
            [NodesFlowEnum.task]: TaskNode,
            [NodesFlowEnum.skeleton]: SkeletonNode
        }),
        []
    );

    const nodesSide: Record<NodesFlowEnum, ComponentType<any>> = useMemo(() => {
        const filteredNodes = nodesTypes as Record<NodesFlowEnum, ComponentType<any>>;

        return filteredNodes;
    }, [nodesTypes]);

    return { nodesTypes, nodesSide };
}
