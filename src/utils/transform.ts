import { Edge, Node, XYPosition } from 'reactflow';
import NodesFlowEnum from 'types/NodesEnum';
import { WorkspacesType } from 'types/flow';
import { generatePositionsFromCenter } from './helpers';
import flowSettings from 'settings';

type NodeWithoutPosition = Omit<Node, 'position'>;

// type CustomNode = Node & {
//     data: {
//         parent: string;
//         children: string[]
//     }
// }

export const transformComponentsToNodes = (workspace: WorkspacesType): { nodes: Node[]; edges: Edge[] } => {
    const { components } = workspace;

    const nodesWithoutPosition: NodeWithoutPosition[] = components.map((item) => {
        const node: NodeWithoutPosition = {
            id: item.config.name,
            type: NodesFlowEnum.square,
            width: flowSettings.nodeSize,
            height: flowSettings.nodeSize,
            // TODO: PREGUNTAR A LUCI QUE PASA CUANDO SON VARIOS HIJOS
            data: { ...item.config, parent: item.prevId ?? null, children: item.nextId ? [item.nextId] : [], label: item.config.name }
        };

        return node;
    });

    // first relate all children
    const linked = linkChildren(nodesWithoutPosition);
    const prevNodes = linked.nodesWithoutPosition;

    const nodesWithPosition = addNodesPositions(prevNodes);

    return { nodes: nodesWithPosition, edges: linked.edges };
};

export const addNodesPositions = (primalNodes: NodeWithoutPosition[]): Node[] => {
    let nodes: Node[] = [];
    let nodesStack: NodeWithoutPosition[] = [...primalNodes];
    let initialPosition = { x: 0, y: 0 };

    while (nodesStack.length > 0) {
        const currentNode = nodesStack.shift();

        if (!currentNode?.data.parent) {
            // currentNode doesn't have a parent
            const newNode: Node = addPositionToNode(currentNode!, initialPosition);
            nodes.push(newNode);
            continue;
        }

        // currentNode has a parent
        const parentNodeId: string = currentNode.data.parent;
        const parentNode = nodes.find((item) => item.id === parentNodeId);

        if (!parentNode) {
            // Parent node doesn't exist yet, push currentNode back to nodesStack
            nodesStack.push(currentNode);
            continue;
        }

        const parentPosition = parentNode.position;

        if (parentNode.data.children && parentNode.data.children.length > 1) {
            const childrendIds = parentNode.data.children;

            const remainingChildrenNodes = nodesStack.filter((node) => childrendIds.includes(node.id));

            const generatedNodes = generatePositionsFromCenter(
                [...remainingChildrenNodes, currentNode],
                parentPosition,
                parentPosition.x + flowSettings.nodeSize / 2
            );

            nodes.push(...generatedNodes);
            nodesStack = nodesStack.filter((node) => !childrendIds.includes(node.id));
            continue;
        }

        const newNode: Node = addPositionToNode(currentNode, { x: parentPosition.x, y: parentPosition.y });
        nodes.push(newNode);
    }

    return nodes;
};

const addPositionToNode = (prevNode: NodeWithoutPosition, parentPosition?: XYPosition): Node => {
    if (!parentPosition) {
        return { ...prevNode, position: { x: 0, y: 0 } };
    }

    const newNode: Node = {
        ...prevNode,
        position: { x: parentPosition.x, y: parentPosition.y + flowSettings.verticalGap + flowSettings.nodeSize }
    };

    return newNode;
};

const linkChildren = (nodes: NodeWithoutPosition[]): { nodesWithoutPosition: NodeWithoutPosition[]; edges: Edge[] } => {
    const newNodes: NodeWithoutPosition[] = [];
    let edges: Edge[] = [];

    nodes.forEach((itemNode) => {
        // search for nodes that have this node.id as their parent
        let nodeId = itemNode.id;

        let childrenNodes = nodes.filter((possibleSon) => possibleSon.data.parent === nodeId);

        let node = { ...itemNode, data: { ...itemNode.data, children: childrenNodes.map((item) => item.id) } };

        newNodes.push(node);

        childrenNodes.forEach((childNode) => {
            edges.push({ id: `${nodeId}-${childNode.id}`, source: nodeId, target: childNode.id });
        });
    });

    return { nodesWithoutPosition: newNodes, edges };
};