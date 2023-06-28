import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ClickAwayListener,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';
import useConfig from 'hooks/useConfig';

import USAIcon from 'assets/images/countries/us.png';
import MXIcon from 'assets/images/countries/mx.png';

// ==============================|| LOCALIZATION ||============================== //

const LocalizationSection = () => {
    const { borderRadius, locale, onChangeLocale } = useConfig();

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<any>(null);
    const [language, setLanguage] = useState<string>(locale);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined,
        lng: string
    ) => {
        setLanguage(lng);
        onChangeLocale(lng);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        setLanguage(locale);
    }, [locale]);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    [theme.breakpoints.down('md')]: {
                        ml: 1
                    }
                }}
            >
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        color: theme.palette.primary.dark,
                        transition: 'all .2s ease-in-out',
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.main,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.light
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    {language !== 'en' && (
                        <Typography variant="h5" sx={{ textTransform: 'uppercase' }} color="inherit">
                            {language}
                        </Typography>
                    )}
                    {language === 'en' && <TranslateTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                </Avatar>
            </Box>

            <Popper
                placement={matchesXs ? 'bottom-start' : 'bottom'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [matchesXs ? 0 : -50, 20]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions position={matchesXs ? 'top-left' : 'top'} in={open} {...TransitionProps}>
                            <Paper elevation={16}>
                                {open && (
                                    <List
                                        component="nav"
                                        sx={{
                                            width: '100%',
                                            minWidth: 150,
                                            maxWidth: 200,
                                            bgcolor: theme.palette.background.paper,
                                            borderRadius: `${borderRadius}px`,
                                            [theme.breakpoints.down('md')]: {
                                                maxWidth: 250
                                            }
                                        }}
                                    >
                                        {lenguajesOptions.map((itemLenguage) => (
                                            <ListItemButton
                                                key={itemLenguage.key}
                                                selected={language === itemLenguage.key}
                                                onClick={(event) => handleListItemClick(event, itemLenguage.key)}
                                            >
                                                <ListItemIcon>
                                                    <Box
                                                        component="img"
                                                        src={itemLenguage.icon}
                                                        alt={itemLenguage.key}
                                                        sx={{ width: 25, height: 25 }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Grid container>
                                                            <Typography color="textPrimary">{itemLenguage.name}</Typography>
                                                        </Grid>
                                                    }
                                                />
                                            </ListItemButton>
                                        ))}

                                        {/* <ListItemButton selected={language === 'es'} onClick={(event) => handleListItemClick(event, 'es')}>
                                            <ListItemIcon>
                                                <Box component="img" src={MXIcon} alt="mx" sx={{ width: 25, height: 25 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Grid container>
                                                        <Typography color="textPrimary">Español</Typography>
                                                    </Grid>
                                                }
                                            />
                                        </ListItemButton> */}
                                    </List>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default LocalizationSection;

const lenguajesOptions = [
    { key: 'en', icon: USAIcon, name: 'English' },
    { key: 'es', icon: MXIcon, name: 'Español' }
];
