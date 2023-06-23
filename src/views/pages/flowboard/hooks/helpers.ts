import { Node, XYPosition } from 'reactflow';
import NodesFlowEnum from '../types/NodesEnum';

export function generatePosition(parentNode: Node, newNodeWidth?: number): XYPosition {
    if (!parentNode) {
        return { x: 100, y: 100 };
    }

    newNodeWidth = newNodeWidth ?? 10;

    const parentX = parentNode.position.x;

    const centerPositionX = parentX + newNodeWidth / 2;

    return { x: centerPositionX, y: parentNode.position.y + 100 };
}

export function generateUUID() {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const searchTargetNode = ({ node, nodes }: { node: Node; nodes: Node[] }): Node | null => {
    // calculate the center point of the node from position and dimensions
    const centerX = node.position.x + node?.width! / 2;
    const centerY = node.position.y + node?.height! / 2;

    // find a node where the center point is inside
    const targetNode = nodes.find(
        (n) =>
            n.type === NodesFlowEnum.skeleton &&
            centerX > n.position.x &&
            centerX < n.position.x + n.width! &&
            centerY > n.position.y &&
            centerY < n.position.y + n.height! &&
            n.id !== node.id // this is needed, otherwise we would always find the dragged node
    );

    return targetNode ?? null;
};

export const getBelowNode = (nodes: Node[], nodePosition: { y: number; x: number }): Node | null => {
    let belowNode: Node | null = null;

    nodes.forEach((n: Node) => {
        let startYPosition = n.position.y;
        let startXPosition = n.position.x;

        let endYPosition = n.position.y + n.height!;
        let endXPosition = n.position.x + n.width!;

        if (
            nodePosition.y >= startYPosition &&
            nodePosition.y <= endYPosition &&
            nodePosition.x >= startXPosition &&
            nodePosition.x <= endXPosition
        ) {
            belowNode = n;
        }
    });

    return belowNode;
};
