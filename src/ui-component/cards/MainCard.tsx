import React, { Ref } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    Stack,
    IconButton,
    Collapse
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// project imports
import { KeyedObject } from 'types';
import { useNavigate } from 'react-router-dom';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
    border?: boolean;
    boxShadow?: boolean;
    children: React.ReactNode | string;
    style?: React.CSSProperties;
    content?: boolean;
    className?: string;
    contentClass?: string;
    contentSX?: CardContentProps['sx'];
    showBack?: boolean;
    sx?: CardProps['sx'];
    secondary?: CardHeaderProps['action'];
    shadow?: string;
    elevation?: number;
    title?: string;
    header?: React.ReactNode;
}

const MainCard = React.forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            showBack,
            header,
            ...others
        }: MainCardProps,
        ref: Ref<HTMLDivElement>
    ) => {
        const theme = useTheme();
        const navigate = useNavigate();

        return (
            <>
                {/* card header and action */}
                <Card sx={{ mb: 2 }}>
                    {title && (
                        <CardHeader
                            sx={headerSX}
                            title={
                                <Stack direction="row" alignItems="center">
                                    <Collapse orientation="horizontal" in={showBack}>
                                        <IconButton size="small" onClick={() => navigate(-1)} sx={{ mr: 0.5 }}>
                                            <ChevronLeftIcon />
                                        </IconButton>
                                    </Collapse>
                                    <Typography variant="h3">{title}</Typography>
                                </Stack>
                            }
                            action={secondary}
                        />
                    )}
                    {header && header}
                </Card>
                <Card
                    ref={ref}
                    {...others}
                    sx={{
                        border: border ? '1px solid' : 'none',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                        ':hover': {
                            boxShadow: boxShadow
                                ? shadow ||
                                  (theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)')
                                : 'inherit'
                        },
                        ...sx
                    }}
                >
                    {/* card content */}
                    {content && (
                        <CardContent sx={contentSX} className={contentClass}>
                            {children}
                        </CardContent>
                    )}
                    {!content && children}
                </Card>
            </>
        );
    }
);

export default MainCard;
