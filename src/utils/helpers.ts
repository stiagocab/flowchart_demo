import { Node, XYPosition, Edge } from 'reactflow';
import NodesFlowEnum from '../types/NodesEnum';
import flowSettings from 'settings';

export function generatePosition(parentNode: Node, newNodeWidth?: number): XYPosition {
    if (!parentNode) {
        return { x: 100, y: 100 };
    }

    newNodeWidth = newNodeWidth ?? 10;

    const parentX = parentNode.position.x;

    const centerPositionX = parentX + newNodeWidth / 2;

    return { x: centerPositionX, y: parentNode.position.y + flowSettings.verticalGap };
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

export function centerVertical(nodes: Node[], selectedNodes: Node[]): Node[] {
    let startYPosition = 0;
    let endYPosition = 0;

    selectedNodes.forEach((itemA: Node) => {
        const startPosition = itemA.position.y;
        const endPosition = itemA.position.y + itemA.height!;

        if (startPosition < startYPosition) {
            startYPosition = startPosition;
        }

        if (endPosition > endYPosition) {
            endYPosition = endPosition;
        }
    });

    const centerY = (startYPosition + endYPosition) / 2;

    return nodes.map((node) => {
        const isSelected = selectedNodes.some((itemNode) => itemNode.id === node.id);

        if (isSelected) {
            return { ...yCenterNode(node, centerY) };
        }

        return node;
    });
}

export const yCenterNode = (node: Node, centerY: number): Node => {
    const yCenter = centerY - node.height! / 2;
    return { ...node, position: { ...node.position, y: yCenter } };
};

export function centerHorizontal(nodes: Node[], selectedNodes: Node[]): Node[] {
    // let maxWidth = 1;
    let startXPosition = 0;
    let endXPosition = 1;

    selectedNodes.forEach((itemA) => {
        const startPosition = itemA.position.x;
        const endPosition = itemA.position.x + itemA.width!;

        if (startPosition < startXPosition) {
            startXPosition = startPosition;
        }

        if (endPosition > endXPosition) {
            endXPosition = endPosition;
        }
    });

    const centerX = (startXPosition + endXPosition) / 2;

    return nodes.map((node) => {
        const isSelected = selectedNodes.some((itemNode) => itemNode.id === node.id);

        if (isSelected) {
            return { ...xCenterNode(node, centerX) };
        }

        return node;
    });
}

export const xCenterNode = (node: Node, centerX: number): Node => {
    const xCenter = centerX - node.width! / 2;
    return { ...node, position: { ...node.position, x: xCenter } };
};

export const replaceAnimatedEdge = (prevEdges: Edge[], targetNodeId: string) => {
    const nextEdges = prevEdges.map((e) => {
        if (e.animated && e.target === targetNodeId) {
            return { ...e, animated: false };
        }

        return e;
    });
    return nextEdges;
};

export const createGroupPosition = (nodes: Node[]): { position: XYPosition; width: number; height: number } => {
    const initialNode = nodes[0];

    let startXPosition = initialNode.position.x;
    let startYPosition = initialNode.position.y;

    let endXPosition = startXPosition + initialNode.width!;
    let endYPosition = startYPosition + initialNode.height!;

    nodes.forEach((itemA) => {
        const startX = itemA.position.x;
        const startY = itemA.position.y;

        const endX = itemA.position.x + itemA.width!;
        const endY = itemA.position.y + itemA.height!;

        if (startX < startXPosition) {
            startXPosition = startX;
        }

        if (startY < startYPosition) {
            startYPosition = startY;
        }

        if (endX > endXPosition) {
            endXPosition = endX;
        }

        if (endY > endYPosition) {
            endYPosition = endY;
        }
    });

    let position = { start: { x: startXPosition - 10, y: startYPosition - 10 }, end: { x: endXPosition + 10, y: endYPosition + 10 } };

    return {
        position: position.start,
        width: position.end.x - position.start.x,
        height: position.end.y - position.start.y
    };
};

export const generatePositionsFromCenter = (prevNodes: Omit<Node, 'position'>[], parentPosition: XYPosition, center: number): Node[] => {
    const width = flowSettings.nodeSize;
    const gap = flowSettings.horizontalGap;
    let nodes: Node[] = [];
    const yPosition = parentPosition.y + flowSettings.verticalGap + flowSettings.nodeSize;

    const totalWidth = prevNodes.length * width + (prevNodes.length - 1) * gap;

    const startPosition = center - totalWidth / 2;

    prevNodes.forEach((item, index) => {
        let position = {
            x: startPosition + (gap + width) * index,
            y: yPosition
        };

        nodes = [...nodes, { ...item, position }];
    });

    return nodes;
};
