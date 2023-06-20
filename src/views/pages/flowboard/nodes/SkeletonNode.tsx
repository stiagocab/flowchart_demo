import { MouseEvent, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Menu, Paper, useTheme } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

import { Position } from 'reactflow';

import CustomHandle from '../components/CustomHandle';
import { ICustomNodeProps } from '../types/nodes';

function SkeletonNode({ data, selected }: ICustomNodeProps) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (data.origin === 'SIDE') {
            return null;
        }
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                sx={{
                    background: theme.palette.background.default,
                    paddingY: 1,
                    paddingX: 3,
                    border: '2px dotted',
                    borderColor: selected ? 'primary.main' : 'divider',
                    boxShadow: selected ? 3 : 0,
                    width: data.origin === 'SIDE' ? 1 : null,
                    cursor: 'inherit',
                    '&:active': {
                        background: theme.palette.background.default
                    },
                    '&:hover': {
                        background: theme.palette.background.default
                    }
                }}
                component={Button}
                onClick={handleClick}
            >
                <AddIcon />
            </Button>
            <CustomHandle hide={data.hideHandle} id="b" type="target" position={Position.Top} color={theme.palette.success.main} />

            <Menu
                id="available-nodes-selector-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <NodeMenu />
            </Menu>
        </>
    );
}

export default SkeletonNode;

const NodeMenu = () => (
    <Paper sx={{ paddingX: 1 }}>
        <IconButton>
            <SettingsIcon fontSize="small" />
        </IconButton>
        <IconButton>
            <DeleteIcon fontSize="small" />
        </IconButton>
    </Paper>
);

// const NodeMenuSelector = () => (
//     <Paper sx={{ p: 2, maxWidth: 220 }}>
//         <Grid container spacing={1}>
//             {['A', 'B', 'C', 'D', 'F'].map((item) => (
//                 <Grid item xs={12}>
//                     <Card elevation={2} sx={{ p: 2 }}>
//                         <Typography>NODE TYPE {item}</Typography>
//                     </Card>
//                 </Grid>
//             ))}
//         </Grid>
//     </Paper>
// );
