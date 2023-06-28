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

export default function WorkspacePages() {
    const intl = useIntl();

    return (
        <>
            <MainCard
                content
                title={
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h3">{intl.formatMessage({ id: 'workspaces' })}</Typography>
                        <Button
                            title={intl.formatMessage({ id: 'new_workspace' })}
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ ml: 1 }}
                            component={Link}
                            to={FLOW_ROUTES.workspaceCreate}
                        >
                            {intl.formatMessage({ id: 'new' })}
                        </Button>
                    </Stack>
                }
            >
                <Button component={Link} to={FLOW_ROUTES.workspaceCreate}>
                    {intl.formatMessage({ id: 'new_workspace' })}
                </Button>
            </MainCard>
        </>
    );
}
