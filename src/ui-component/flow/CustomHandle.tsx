import React, { CSSProperties, useMemo } from 'react';

// mui imports
import { useTheme } from '@mui/system';

import { Handle, HandleProps } from 'reactflow';

type CustomHandleProps = HandleProps & { color?: string | undefined; hide?: boolean | undefined };

export default function CustomHandle({ color, hide = false, ...props }: CustomHandleProps) {
    const theme = useTheme();

    if (hide) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handle: CSSProperties = useMemo(() => {
        return {
            width: 15,
            height: 7,
            background: color || theme.palette.primary.main,
            borderRadius: 2,
            border: 'none'
        };
    }, [color, theme.palette.primary.main]);

    return <Handle {...props} style={handle} />;
}
