import React, { useMemo, useState } from 'react';

// mui imports
import { Typography, Fade, Menu, IconButton, Box, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

// project imports
import NodesNamesEnum from './customNodes/References';
import { CheckerCustomer } from './customNodes/TextUpdaterNode';
import { TimerCustomer } from './customNodes/TimerNode';
import { GeneratorCustomer } from './customNodes/Generator';
import { SenderEmailCustomer } from './customNodes/SenderNode';
import { useCustomFlowContext } from './CustomFlowContext';

export default function NodesSettings() {
    const theme = useTheme();
    const { selectedNodetype } = useCustomFlowContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const elementToRender = useMemo(() => {
        switch (selectedNodetype) {
            case NodesNamesEnum.checker:
                return <CheckerCustomer />;
            case NodesNamesEnum.timer:
                return <TimerCustomer />;
            case NodesNamesEnum.generator:
                return <GeneratorCustomer />;
            case NodesNamesEnum.sender:
                return <SenderEmailCustomer />;
            default:
                return <Typography>Click a Node to custom</Typography>;
        }
    }, [selectedNodetype]);

    return (
        <>
            <Fade in={selectedNodetype !== null}>
                <IconButton
                    onClick={handleClick}
                    sx={{
                        borderRadius: '50%',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
                        width: '48px',
                        height: '48px',
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 10,
                        background: theme.palette.secondary.main,
                        '&:hover': {
                            background: theme.palette.secondary.main
                        }
                    }}
                >
                    <SettingsIcon sx={{ color: theme.palette.background.paper }} />
                </IconButton>
            </Fade>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 500 }}
                keepMounted
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                sx={{ zIndex: 10 }}
            >
                <Box sx={{ p: 2, zIndex: 4, width: 280 }}>{elementToRender}</Box>
            </Menu>
        </>
    );
}
