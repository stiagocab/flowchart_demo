import {
    Box,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Fade,
    CircularProgress,
    Collapse,
    Stack
} from '@mui/material';

import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { FLOW_ROUTES, generateRoute } from 'routes/pathGenerator';
import { getMockData } from 'sampleData';
import { useEffect, useState } from 'react';
import { IWorkspace } from 'types/workspace';

export default function WorkspacesList() {
    const [workspaces, setWorkspaces] = useState<IWorkspace[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMockData().then((data) => {
            setWorkspaces(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <Collapse in={isLoading}>
                <Stack sx={{ with: 1, pt: 3 }} justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Stack>
            </Collapse>
            <Fade in={workspaces !== null && !isLoading}>
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
                        <TableBody>
                            {workspaces &&
                                workspaces.map((workspace) => (
                                    <TableRow key={`workspace-list-${workspace.id}`}>
                                        <TableCell sx={{ pl: 3 }}>#</TableCell>
                                        <TableCell>{workspace.name}</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    component={Link}
                                                    to={generateRoute(FLOW_ROUTES.workspaceEdit, {
                                                        workspaceId: workspace.id
                                                    })}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton size="small">
                                                    <PauseCircleIcon />
                                                </IconButton>
                                                <IconButton size="small">
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fade>
        </>
    );
}
