import React, { useCallback, useMemo, useState } from 'react';
import { useSelectionProps } from '../types/flow';
import { Node } from 'reactflow';

import DeleteIcon from '@mui/icons-material/Delete';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import useFlowContext from './useFlowContext';
import RightClickMenu from '../components/Menu/RightClickMenu';

export default function useSelection(): useSelectionProps {
    const { setNodes } = useFlowContext();
    const [selectedNodes, setSelectedNodes] = useState<Node[] | null>(null);

    const [anchorRightMenu, setAnchorRightMenu] = React.useState<null | HTMLElement>(null);
    const [anchorNodeMenu, setAnchorNodeMenu] = React.useState<null | HTMLElement>(null);

    const onSelectRightClick = (event: React.MouseEvent<Element, MouseEvent>, nodes: Node[]) => {
        event.preventDefault();

        setAnchorRightMenu(event.currentTarget as HTMLElement);

        setSelectedNodes(nodes);
    };

    const onNodeRightClick = (event: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        event.preventDefault();

        setAnchorNodeMenu(event.currentTarget as HTMLElement);

        setSelectedNodes([node]);
    };

    const handleClose = () => {
        setAnchorRightMenu(null);
        setSelectedNodes(null);
    };

    const onCenterVerticalClick = useCallback(
        () => setNodes((prevNodes) => centerVertical(prevNodes, selectedNodes!)),
        [selectedNodes, setNodes]
    );
    const onCenterHorizontalClick = useCallback(
        () => setNodes((prevNodes) => centerHorizontal(prevNodes, selectedNodes!)),
        [selectedNodes, setNodes]
    );

    const onDeleteSelection = useCallback((toDelete: Node[] = []) => {
        setAnchorNodeMenu(null);
        setAnchorRightMenu(null);
        setNodes((prevNodes) => {
            return prevNodes.filter((item) => toDelete.every((itemA) => itemA.id !== item.id));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const RenderContextSelectionMenu: JSX.Element = useMemo(() => {
        return (
            <RightClickMenu
                handleClose={handleClose}
                anchorEl={anchorRightMenu}
                open={Boolean(anchorRightMenu)}
                id="context-menu-selection"
                options={[
                    {
                        label: 'delete',
                        icon: <DeleteIcon />,
                        action: () => onDeleteSelection(selectedNodes!),
                        shortcut: 'backspace'
                    },
                    {
                        label: 'Center vertical',
                        icon: <AlignVerticalCenterIcon />,
                        action: onCenterVerticalClick
                        // shortcut: 'CTRL + SHIFT + C'
                    },
                    {
                        label: 'Center horizontal',
                        icon: <AlignHorizontalCenterIcon />,
                        action: onCenterHorizontalClick
                    }
                ]}
            />
        );
    }, [anchorRightMenu, onCenterHorizontalClick, onCenterVerticalClick, selectedNodes, onDeleteSelection]);

    const RenderContextNodeMenu: JSX.Element = useMemo(() => {
        return (
            <RightClickMenu
                handleClose={() => {
                    setAnchorNodeMenu(null);
                    setSelectedNodes(null);
                }}
                anchorEl={anchorNodeMenu}
                open={Boolean(anchorNodeMenu)}
                id="context-men-node"
                options={[
                    {
                        label: 'delete',
                        icon: <DeleteIcon />,
                        action: () => onDeleteSelection(selectedNodes!)
                    }
                ]}
            />
        );
    }, [anchorNodeMenu, selectedNodes, onDeleteSelection]);

    return {
        onSelectRightClick,
        RenderContextSelectionMenu,
        RenderContextNodeMenu,
        onNodeRightClick
    };
}

function centerVertical(nodes: Node[], selectedNodes: Node[]): Node[] {
    // calcular el centro de los seleccionado

    // let maxHeight = 1;

    let startYPosition = 0;
    let endYPosition = 0;

    selectedNodes.forEach((itemA: Node) => {
        // if (itemA.height! > maxHeight) {
        //     maxHeight = itemA.height!;
        // }

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

const yCenterNode = (node: Node, centerY: number): Node => {
    const yCenter = centerY - node.height! / 2;
    return { ...node, position: { ...node.position, y: yCenter } };
};

function centerHorizontal(nodes: Node[], selectedNodes: Node[]): Node[] {
    // Calcular el centro horizontal de los nodos seleccionados
    // let maxWidth = 1;
    let startXPosition = 0;
    let endXPosition = 1;

    selectedNodes.forEach((itemA) => {
        // if (itemA.width && itemA.width > maxWidth) {
        //     maxWidth = itemA.width;
        // }

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

const xCenterNode = (node: Node, centerX: number): Node => {
    const xCenter = centerX - node.width! / 2;
    return { ...node, position: { ...node.position, x: xCenter } };
};
