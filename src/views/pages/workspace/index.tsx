import { Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { FLOW_ROUTES } from 'routes/pathGenerator';
import MainCard from 'ui-component/cards/MainCard';

export default function WorkspacePages() {
    return (
        <MainCard>
            <Typography>LSITA</Typography>
            <Button component={Link} to={FLOW_ROUTES.workspaceCreate}>
                CREAR WORKSPACES
            </Button>
        </MainCard>
    );
}
