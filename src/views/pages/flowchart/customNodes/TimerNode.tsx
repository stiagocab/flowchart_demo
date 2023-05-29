import { TextField, Card, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material';

import { Handle, Position } from 'reactflow';
import { INodeData } from '../CustomFlowContext';

import AddIcon from '@mui/icons-material/Add';

export default function TimerNode() {
    return (
        <>
            <Handle type="target" position={Position.Top} id="target" />
            <Card elevation={2} sx={{ paddingY: 2, paddingX: 2 }}>
                <Typography>WAIT</Typography>
            </Card>
            <Handle type="source" position={Position.Bottom} id="source" />
        </>
    );
}

export const TimerNodeButton = ({ data }: { data: Partial<INodeData> }) => {
    return (
        <Button fullWidth variant="contained" startIcon={<AddIcon />}>
            <Typography>WAIT</Typography>
        </Button>
    );
};

const timeUnits = ['seconds', 'minutes', 'hours'];

export const TimerCustomer = () => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField name="timeValue" label="Wait for:" type="number" />
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Time Unit</InputLabel>
                <Select name="timeUnit" defaultValue="seconds">
                    {timeUnits.map((unit) => (
                        <MenuItem key={unit} value={unit}>
                            {unit}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>{' '}
        </Grid>
    </Grid>
);
