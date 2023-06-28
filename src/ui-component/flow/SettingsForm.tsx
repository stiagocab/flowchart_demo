import React from 'react';

import { Box, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = '30%';
const minWidth = 230;
const maxWidth = 350;

export default function SettingsForm({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) {
    return (
        <Box
            sx={{
                width: isOpen ? drawerWidth : 0,
                minWidth: isOpen ? minWidth : 0,
                maxWidth,
                transitionDuration: '330ms',
                transitionTimingFunction: 'linear',
                height: 1,
                boxSizing: 'border-box',
                zIndex: 10,
                overflow: 'hidden'
            }}
        >
            <Stack alignItems="flex-end" justifyContent="flex-end" sx={{ width: 1 }}>
                <IconButton sx={{ mr: 1, mt: 1 }} onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Stack>
            <Box sx={{ p: 2 }}>
                <Typography>CONFIGURAR NODO</Typography>
            </Box>
        </Box>
    );
}
