import React, { useCallback, useMemo, useState } from 'react';
import { useSelectionProps } from '../types/flow';
import { Node, useOnSelectionChange } from 'reactflow';

import DeleteIcon from '@mui/icons-material/Delete';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import RightClickMenu from '../components/Menu/RightClickMenu';

import useFlowContext from './useFlowContext';

// functions
import { centerHorizontal, centerVertical, createGroupPosition, generateUUID } from './helpers';

export default function useSelection(): useSelectionProps {
    const { setNodes, store } = useFlowContext();
    const [selectedNodes, setSelectedNodes] = useState<Node[] | null>(null);

    const [anchorRightMenu, setAnchorRightMenu] = React.useState<null | HTMLElement>(null);
    const [anchorNodeMenu, setAnchorNodeMenu] = React.useState<null | HTMLElement>(null);

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            console.log('changed selection', nodes, edges);
            setSelectedNodes(nodes);
        }
    });

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

    const handleClose = useCallback(() => {
        setAnchorRightMenu(null);
        setSelectedNodes(null);

        store.getState().unselectNodesAndEdges();
    }, [store]);

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

    const groupSelectedNodes = useCallback(() => {
        if (selectedNodes && selectedNodes.length > 1) {
            const newGroupId = `group-${generateUUID()}`;

            const groupCordinates = createGroupPosition(selectedNodes);

            const finalCoords = groupCordinates.position;

            // flowInstance?.project({
            // x: groupCordinates.position.x,
            // y: groupCordinates.position.y
            // }) ??

            const newGroupNode: Node = {
                id: newGroupId,
                type: 'group',
                position: {
                    x: finalCoords?.x,
                    y: finalCoords?.y
                },
                style: {
                    width: groupCordinates.width,
                    height: groupCordinates.height
                },
                data: {}
            };

            setNodes((prevNodes) => {
                return [
                    newGroupNode,
                    ...prevNodes.map((item) => {
                        const isSelected = selectedNodes.some((itemA) => itemA.id === item.id);

                        if (isSelected) {
                            const updatedNode: Node = {
                                ...item,
                                positionAbsolute: item.position,
                                parentNode: newGroupId,
                                expandParent: false,
                                extent: 'parent'
                            };

                            return updatedNode;
                            // return { ...item,  };
                        }

                        return item;
                    })
                ];
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedNodes]);

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
    }, [handleClose, anchorRightMenu, onCenterVerticalClick, onCenterHorizontalClick, onDeleteSelection, selectedNodes]);

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
