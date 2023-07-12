import { useState } from 'react';
import { Box, IconButton, Stack, CardHeader } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/Save';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useNavigate } from 'react-router-dom';

import EditableInput from 'ui-component/EditableInput';

export default function WorkspaceHeader() {
    // hooks
    const navigate = useNavigate();

    const [workspaceData, setWorkspaceData] = useState<{ title: string; description: string }>({
        title: 'Título del workspace',
        description: 'Descripción del workspace'
    });

    const handleChange = (value: string | number, target: string) => {
        setWorkspaceData((prev) => ({ ...prev, [target]: value }));
    };

    return (
        <CardHeader
            sx={{ '& .MuiCardHeader-action': { mr: 0 }, p: 1 }}
            title={
                <>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            width: 1
                        }}
                    >
                        <Stack direction="row" alignItems="center">
                            <IconButton size="small" onClick={() => navigate(-1)} sx={{ mr: 0.5 }}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <Box
                                sx={{
                                    width: 0.5,
                                    minWidth: {
                                        xs: 180,
                                        md: 250
                                    },
                                    maxWidth: 650
                                }}
                            >
                                <EditableInput
                                    onChange={(val) => handleChange(val, 'title')}
                                    name="title"
                                    fullWidth
                                    value={workspaceData.title}
                                />
                            </Box>
                        </Stack>
                        <Box>
                            <IconButton>
                                <CloudDownloadIcon />
                            </IconButton>
                            <IconButton>
                                <RestoreIcon />
                            </IconButton>
                            <IconButton>
                                <SaveIcon />
                            </IconButton>
                        </Box>
                    </Stack>

                    <Box sx={{ width: 1, paddingX: 2, mb: 1 }}>
                        <EditableInput
                            onChange={(val) => handleChange(val, 'description')}
                            name="description"
                            fullWidth
                            value={workspaceData.description}
                            multiline
                            maxRows={3}
                        />
                    </Box>
                </>
            }
        />
    );
}
