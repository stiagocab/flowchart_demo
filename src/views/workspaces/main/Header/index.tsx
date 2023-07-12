import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { FLOW_ROUTES } from 'routes/pathGenerator';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&:before': {
        display: 'none'
    }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1)
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function WorkspaceListHeader() {
    const intl = useIntl();

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <Accordion expanded={isExpanded} onChange={() => setIsExpanded((prev) => !prev)}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Stack sx={{ width: 1 }} direction="row" alignItems="center">
                    <Button component={Link} to={FLOW_ROUTES.workspaceCreate}>
                        {intl.formatMessage({ id: 'new_workspace' })}
                    </Button>
                    <Typography variant="button">Filtros:</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Lista de filtros disponibles</Typography>
            </AccordionDetails>
        </Accordion>
    );
}
