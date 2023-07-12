import React from 'react';

// mui imports
import { Typography, Stack } from '@mui/material';

//

// project imports
import MainCard from 'ui-component/cards/MainCard';

import { useIntl } from 'react-intl';
import WorkspaceListHeader from './Header';
import WorkspacesList from './List';

export default function WorkspacesListPages() {
    const intl = useIntl();

    return (
        <>
            <MainCard content={false} title={intl.formatMessage({ id: 'workspaces' })}>
                <WorkspaceListHeader />
                <Stack sx={{ p: 2 }}>
                    <WorkspacesList />
                </Stack>
            </MainCard>
        </>
    );
}
