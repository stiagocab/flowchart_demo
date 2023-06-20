import { Box, Typography, useTheme } from '@mui/material';
import { Position } from 'reactflow';
import CustomHandle from '../components/CustomHandle';
import { ICustomNodeProps } from '../types/nodes';

export default function DotNode({ data, selected }: ICustomNodeProps) {
    const theme = useTheme();

    return (
        <>
            <CustomHandle hide={data.hideHandle} type="target" position={Position.Top} id="dot-target" />
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    boxSizing: 'border-box',
                    border: '2px solid',
                    borderColor: selected ? 'primary.main' : 'divider',
                    boxShadow: selected ? 3 : 0,
                    borderRadius: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography>{data.label ?? 'DOT'}</Typography>
            </Box>
            <CustomHandle hide={data.hideHandle} type="source" position={Position.Bottom} id="dot-source" />
        </>
    );
}
