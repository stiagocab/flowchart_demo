import React from 'react';
import { Box, Typography } from '@mui/material';
import { Position } from 'reactflow';
import { ICustomNodeProps } from '../types/nodes';
import CustomHandle from 'ui-component/flow/CustomHandle';

export default function SquareNode({ data, selected }: ICustomNodeProps) {
    return (
        <>
            <CustomHandle hide={data.hideHandle} type="target" position={Position.Top} id="square-target" />
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    boxSizing: 'border-box',
                    border: '2px solid',
                    borderColor: selected ? 'primary.main' : 'divider',
                    boxShadow: selected ? 3 : 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography>{data.label ?? 'SQ'}</Typography>
            </Box>
            <CustomHandle hide={data.hideHandle} type="source" position={Position.Bottom} id="square-source" />
        </>
    );
}
