import React, { useMemo } from 'react';

import { Box, Table, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import { useIntl } from 'react-intl';

export default function WorkspacesList() {
    const data: WorkspacesType[] = _mockData;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}

type WorkspacesType = {
    id: number;
    title: string;
    description: string;
    type: 'RECURRENT' | 'ONCE';
    status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ERROR' | 'PENDING';
    frecuency?: number | null;
    creationDate: string;
    executionDate: string;
};

const _mockData: WorkspacesType[] = [
    {
        id: 1,
        title: 'cupidatat eiusmod',
        type: 'RECURRENT',
        description:
            'Nisi cillum minim labore non id reprehenderit eiusmod est ex minim sunt. Non laboris laborum mollit tempor nulla ea magna aliqua veniam.',
        frecuency: 10,
        creationDate: '2022-11-22',
        executionDate: '2023-01-02',
        status: 'ERROR'
    },
    {
        id: 2,
        title: 'pariatur aliqua',
        type: 'ONCE',
        description:
            'Ut ea esse culpa tempor est amet occaecat occaecat. Proident dolor amet eu sunt pariatur laboris est exercitation fugiat sint elit.',
        frecuency: null,
        creationDate: '2023-01-18',
        executionDate: '2023-03-23',
        status: 'COMPLETED'
    },
    {
        id: 3,
        title: 'officia dolor',
        type: 'ONCE',
        description:
            'Laboris ea consequat incididunt elit dolor cupidatat ex ex consequat dolor voluptate proident commodo. In eiusmod incididunt esse qui exercitation nisi.',
        frecuency: null,
        creationDate: '2022-12-24',
        executionDate: '2023-01-24',
        status: 'COMPLETED'
    },
    {
        id: 4,
        title: 'deserunt dolor',
        type: 'RECURRENT',
        description:
            'Non ipsum dolor elit minim mollit irure ex culpa tempor. Pariatur cillum sunt proident aliquip minim labore adipisicing laborum quis ut amet eu.',
        frecuency: 10,
        creationDate: '2023-03-11',
        executionDate: '2023-04-24',
        status: 'ERROR'
    },
    {
        id: 5,
        title: 'elit esse',
        type: 'ONCE',
        description: 'Irure amet aliqua sint elit ullamco pariatur irure ad. Cupidatat ea commodo dolor veniam commodo ex.',
        frecuency: null,
        creationDate: '2023-04-17',
        executionDate: '2023-06-21',
        status: 'ACTIVE'
    },
    {
        id: 6,
        title: 'aliqua elit',
        type: 'ONCE',
        description:
            'Adipisicing laborum cupidatat deserunt eiusmod aliquip culpa quis velit ea sint. Incididunt aliqua sint amet sunt irure pariatur elit laboris et sit officia sint.',
        frecuency: null,
        creationDate: '2023-03-12',
        executionDate: '2023-07-03',
        status: 'COMPLETED'
    },
    {
        id: 7,
        title: 'amet nulla',
        type: 'RECURRENT',
        description: 'Et ipsum veniam mollit nisi sint tempor minim ullamco velit commodo. Sint mollit excepteur qui pariatur ea nisi.',
        frecuency: 10,
        creationDate: '2023-04-19',
        executionDate: '2023-07-29',
        status: 'PENDING'
    },
    {
        id: 8,
        title: 'velit voluptate',
        type: 'RECURRENT',
        description:
            'Eu fugiat in dolore consectetur amet anim anim. Laboris tempor sint officia deserunt nisi reprehenderit sit adipisicing.',
        frecuency: 30,
        creationDate: '2023-04-09',
        executionDate: '2023-06-27',
        status: 'COMPLETED'
    },
    {
        id: 9,
        title: 'exercitation dolore',
        type: 'RECURRENT',
        description:
            'Dolore aliquip ullamco eiusmod sunt magna dolor nostrud anim nisi. Duis officia fugiat ex dolore sint mollit ullamco ea nostrud.',
        frecuency: 10,
        creationDate: '2023-03-01',
        executionDate: '2023-06-23',
        status: 'ACTIVE'
    },
    {
        id: 10,
        title: 'incididunt labore',
        type: 'RECURRENT',
        description: 'Laborum esse do anim elit commodo enim aute incididunt. Consectetur voluptate aute laborum eu.',
        frecuency: 30,
        creationDate: '2023-03-31',
        executionDate: '2023-07-17',
        status: 'PENDING'
    },
    {
        id: 11,
        title: 'quis quis',
        type: 'ONCE',
        description: 'Nulla duis ex duis enim elit ut mollit quis cillum. Quis irure voluptate reprehenderit mollit irure elit.',
        frecuency: null,
        creationDate: '2023-04-08',
        executionDate: '2023-06-15',
        status: 'ERROR'
    }
];
