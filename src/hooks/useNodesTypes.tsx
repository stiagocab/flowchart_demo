import { ComponentType, useMemo } from 'react';
import { NodeTypes } from 'reactflow';
import SkeletonNode from 'nodes/SkeletonNode';
import NodesFlowEnum from 'types/NodesEnum';
import DotNode from 'nodes/Dot';
import SquareNode from 'nodes/Square';
import TriangleNode from 'nodes/TriangleNode';

export default function useNodesTypes() {
    const nodesTypes: NodeTypes = useMemo(
        () => ({
            [NodesFlowEnum.skeleton]: SkeletonNode,
            [NodesFlowEnum.dot]: DotNode,
            [NodesFlowEnum.square]: SquareNode,
            [NodesFlowEnum.triangle]: TriangleNode
        }),
        []
    );

    const nodesSide: Record<NodesFlowEnum, ComponentType<any>> = useMemo(() => {
        const filteredNodes = nodesTypes as Record<NodesFlowEnum, ComponentType<any>>;

        return filteredNodes;
    }, [nodesTypes]);

    return { nodesTypes, nodesSide };
}
