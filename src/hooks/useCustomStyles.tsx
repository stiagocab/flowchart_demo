import React, { useMemo } from 'react';

import { useTheme } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createMixins';

export default function useCustomStyles(): { [key: string]: CSSProperties } {
    const theme = useTheme();

    const handle: CSSProperties = useMemo(
        () => ({
            width: 15,
            height: 7,
            background: theme.palette.primary.main,
            borderRadius: 2,
            border: 'none',
            '&::hover': {
                background: theme.palette.secondary.main
            }
        }),
        [theme]
    );

    return { handle };
}
