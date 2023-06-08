import React, { CSSProperties, useMemo } from 'react';

// mui imports
import { useTheme } from '@mui/system';

import { Handle, HandleProps } from 'reactflow';

type CustomHandleProps = HandleProps & { color?: string | undefined };

export default function CustomHandle({ color, ...props }: CustomHandleProps) {
    const theme = useTheme();

    const handle: CSSProperties = useMemo(() => {
        console.log('color', color);

        return {
            width: 15,
            height: 7,
            background: color || theme.palette.primary.main,
            borderRadius: 2,
            border: 'none'
        };
    }, [color, theme.palette.primary.main]);

    // const isValidConnection = (connection) => connection.target === 'B';

    return <Handle {...props} style={handle} />;
}
