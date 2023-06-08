import { useMemo } from 'react';
import { NodeTypes } from 'reactflow';
import SkeletonNode from '../nodes/SkeletonNode';
import NodesFlowEnum from '../types/NodesEnum';

export default function useNodesTypes() {
    const nodesTypes: NodeTypes = useMemo(
        () => ({
            [`${NodesFlowEnum.skeleton}`]: SkeletonNode
        }),
        []
    );

    return nodesTypes;
}
