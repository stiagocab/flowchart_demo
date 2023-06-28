import React from 'react';

// mui imports
import { Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

//
import { Link } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import { FLOW_ROUTES } from 'routes/pathGenerator';
import { useIntl } from 'react-intl';

export default function WorkspacesListPages() {
    const intl = useIntl();

    return (
        <>
            <MainCard content title={intl.formatMessage({ id: 'workspaces' })}>
                <Button component={Link} to={FLOW_ROUTES.workspaceCreate}>
                    {intl.formatMessage({ id: 'new_workspace' })}
                </Button>
            </MainCard>
        </>
    );
}
