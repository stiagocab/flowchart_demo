import { FormControl, Card, InputLabel, Select, MenuItem, Typography, Grid, FormControlLabel, Switch } from '@mui/material';

import { Handle, Position } from 'reactflow';
import { INodeData } from '../CustomFlowContext';

export default function SenderNode({ data }: { data: Partial<INodeData> }) {
    return (
        <>
            <Handle type="target" position={Position.Top} id="target" />
            <Card elevation={2} sx={{ paddingY: 2, paddingX: 2 }}>
                <Typography>SEND EMAIL</Typography>
            </Card>
            <Handle type="source" position={Position.Bottom} id="source" />
        </>
    );
}

export const SenderEmailCustomer = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="template-select-label">Email Template</InputLabel>
                    <Select labelId="template-select-label" id="template-select">
                        {emailTemplates.map((template) => (
                            <MenuItem key={template.id} value={template.id}>
                                {template.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel name="senderFinal" control={<Switch />} label="Is the final?" />
            </Grid>
        </Grid>
    );
};

const emailTemplates = [
    {
        name: 'Successful purchase',
        id: 1
    },
    {
        name: 'Basic template A',
        id: 2
    },
    {
        name: 'Generated discount code',
        id: 2
    }
];
