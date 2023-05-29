import React, { ChangeEvent, useState } from 'react';

import {
    FormControl,
    Card,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Grid,
    Button,
    TextField,
    Box,
    FormControlLabel,
    Switch,
    Fade
} from '@mui/material';

import { Handle, Position } from 'reactflow';
import { useCustomFlowContext } from '../CustomFlowContext';
import { INodeData } from '../CustomFlowContext';

type GeneratorNodeProps = {
    data: Partial<INodeData>;
};

export default function GeneratorNode({ data }: GeneratorNodeProps) {
    return (
        <>
            <Handle type="target" position={Position.Top} id="target" />
            <Card elevation={2} sx={{ paddingY: 2, paddingX: 2 }}>
                <Typography>GENERATOR</Typography>
            </Card>
            <Fade in={!data.isFinal}>
                <Handle type="source" position={Position.Bottom} id="source" />
            </Fade>
        </>
    );
}

type Evaluation = {
    condition: string;
    consequence: string;
};

export const GeneratorCustomer = () => {
    const { selectedNode, updateDataNode } = useCustomFlowContext();

    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [condition, setCondition] = useState('');
    const [consequence, setConsequence] = useState('');

    const handleAddEvaluation = () => {
        if (condition && consequence) {
            const newEvaluation: Evaluation = {
                condition,
                consequence
            };
            setEvaluations([...evaluations, newEvaluation]);
            setCondition('');
            setConsequence('');
        }
    };

    const handleUpdateSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        const newDataNode = {
            ...selectedNode?.data,
            isFinal: event.target.checked
        };
        updateDataNode(newDataNode);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    name="generatorText"
                    fullWidth
                    label="Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="consequence-select-label">Consequence</InputLabel>
                    <Select
                        name="generatorConsecuence"
                        labelId="consequence-select-label"
                        id="consequence-select"
                        value={consequence}
                        onChange={(e) => setConsequence(e.target.value)}
                    >
                        <MenuItem value="consequence1">Consequence 1</MenuItem>
                        <MenuItem value="consequence2">Consequence 2</MenuItem>
                        <MenuItem value="consequence3">Consequence 3</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddEvaluation}>
                    Add Evaluation
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    {evaluations.map((evaluation, index) => (
                        <div key={index}>
                            <Typography>
                                Condition: {evaluation.condition}, Consequence: {evaluation.consequence}
                            </Typography>
                        </div>
                    ))}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    name="generatorFinal"
                    control={<Switch onChange={handleUpdateSwitch} value={selectedNode?.data.isFinal} />}
                    label="Is the final?"
                />
            </Grid>
        </Grid>
    );
};
