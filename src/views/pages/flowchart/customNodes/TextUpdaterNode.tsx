import React, { ChangeEvent, useState } from 'react';

import {
    Typography,
    Card,
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
    Radio,
    Grid
} from '@mui/material';

import { Handle, Position } from 'reactflow';
import { INodeData } from '../CustomFlowContext';

function CheckerNode({ data }: { data: Partial<INodeData> }) {
    return (
        <>
            <Handle type="target" position={Position.Top} id="target" />
            <Card elevation={2} sx={{ paddingY: 2, paddingX: 2 }}>
                <Typography>EVALUATE</Typography>
            </Card>
            <Handle type="source" position={Position.Bottom} id="source" />
        </>
    );
}

export default CheckerNode;

export const CheckerCustomer = () => {
    const [selection, setSelection] = useState('brands');

    const handleSelectionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelection(event.target.value);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="selection" name="evaluationType" value={selection} onChange={handleSelectionChange}>
                        <FormControlLabel value="brands" control={<Radio />} label="Brands" />
                        <FormControlLabel value="value" control={<Radio />} label="Value" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {selection === 'brands' ? (
                    <FormControl fullWidth>
                        <InputLabel id="brands-select-label">Brands</InputLabel>
                        <Select name="evaluationBrand" fullWidth labelId="brands-select-label" id="brands-select">
                            <MenuItem value="brand1">Brand 1</MenuItem>
                            <MenuItem value="brand2">Brand 2</MenuItem>
                            <MenuItem value="brand3">Brand 3</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="comparison-select-label">Operator</InputLabel>
                                <Select name="evaluationOperator" labelId="comparison-select-label" id="comparison-select">
                                    <MenuItem value="<"> &le; {/* Less than */}</MenuItem>
                                    <MenuItem value=">">&ge; {/* Greater than */}</MenuItem>
                                    <MenuItem value="="> = </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField name="evaluationValue" label="Value" type="number" />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};
