import React from 'react';
import { Box, Typography } from '@mui/material';
import { Position } from 'reactflow';
import CustomHandle from '../components/CustomHandle';
import { ICustomNodeProps } from '../types/nodes';

export default function TriangleNode({ data, selected }: ICustomNodeProps) {
    return (
        <>
            <CustomHandle hide={data.hideHandle} type="target" position={Position.Top} id="triangle-target" />
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
                    alignItems: 'center',
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50
                }}
            >
                <Typography>{data.label ?? 'TRI'}</Typography>
            </Box>
            <CustomHandle hide={data.hideHandle} type="source" position={Position.Bottom} id="triangle-source" />
        </>
    );
}
