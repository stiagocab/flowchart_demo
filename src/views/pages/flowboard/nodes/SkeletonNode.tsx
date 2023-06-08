import { MouseEvent, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button, Card, Grid, Menu, Paper, SxProps, Typography, useTheme } from '@mui/material';

import { Position } from 'reactflow';
import CustomHandle from '../components/CustomHandle';

// styles
// import styles from '../styles/commonStyles';

function SkeletonNode() {
    const theme = useTheme();
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const openOptions = () => {
    //     handleClick(true);
    // };

    return (
        <>
            <Button
                // elevation={2}
                sx={{
                    background: theme.palette.background.default,
                    paddingY: 1,
                    paddingX: 3,
                    border: '2px dotted',
                    borderColor: theme.palette.grey[400]
                }}
                component={Button}
                onClick={handleClick}
            >
                <AddIcon />
            </Button>
            <CustomHandle id="b" type="target" position={Position.Top} color={theme.palette.success.main} />
            <CustomHandle id="a" type="source" position={Position.Bottom} />

            <Menu
                id="available-nodes-selector-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <NodeMenuSelector />
            </Menu>
        </>
    );
}

export default SkeletonNode;

const NodeMenuSelector = () => (
    <Paper sx={{ p: 2, maxWidth: 220 }}>
        <Grid container spacing={1}>
            {['A', 'B', 'C', 'D', 'F'].map((item) => (
                <Grid item xs={12}>
                    <Card elevation={2} sx={{ p: 2 }}>
                        <Typography>NODE TYPE {item}</Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Paper>
);
