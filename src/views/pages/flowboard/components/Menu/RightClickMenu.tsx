import { Menu, IconButton, Paper } from '@mui/material';

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
            <Paper sx={{ paddingX: 1 }}>
                {options.map((item, index) => {
                    return (
                        <IconButton key={`${item.label ?? ''}-${index}`} title={item.label ?? ''} onClick={item.action}>
                            {item.icon}
                        </IconButton>
                    );
                })}
            </Paper>
        </Menu>
    );
};

export default RightClickMenu;
