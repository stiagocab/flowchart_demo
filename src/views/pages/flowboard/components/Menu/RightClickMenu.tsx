import { Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { ContextMenuOptionType } from '../../types/menu';

export type RightClickMenuType = {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
    options: ContextMenuOptionType[];
    id: string;
};

const RightClickMenu = ({ anchorEl, open, handleClose, options, id }: RightClickMenuType) => {
    return (
        <Menu
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button'
            }}
        >
            {options.map((item, index) => {
                return (
                    <MenuItem key={`${item.label ?? ''}-${index}`} title={item.label ?? ''} onClick={item.action}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText sx={{ textTransform: 'capitalize' }}>{item.label}</ListItemText>
                        <Typography variant="caption" color="text.secondary">
                            {item.shortcut ?? ''}
                        </Typography>
                    </MenuItem>
                );
            })}
        </Menu>
    );
};

export default RightClickMenu;
