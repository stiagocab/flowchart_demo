import { Node } from 'reactflow';

export function generatePosition(node: Node): { x: number; y: number } {
    return { x: node.position.x, y: node.position.y + 100 };
}

export function generateUUID() {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
