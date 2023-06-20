import { Node, XYPosition } from 'reactflow';

export function generatePosition(parentNode: Node, newNodeWidth?: number): XYPosition {
    if (!parentNode) {
        return { x: 100, y: 100 };
    }

    newNodeWidth = newNodeWidth ?? 10;

    console.log('parentNode', parentNode);
    console.log('newNodeWidth', newNodeWidth);

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
