import { Box, Typography, useTheme } from '@mui/material';
import { Position } from 'reactflow';
import { ICustomNodeProps } from '../types/nodes';
import CustomHandle from 'ui-component/flow/CustomHandle';
import flowSettings from 'settings';

export default function DotNode({ data, selected, ...props }: ICustomNodeProps) {
    return (
        <>
            <CustomHandle hide={data.hideHandle} type="target" position={Position.Top} id="dot-target" />
            <Box
                sx={{
                    width: props.id ? flowSettings.nodeSize : 50,
                    height: props.id ? flowSettings.nodeSize : 50,
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
