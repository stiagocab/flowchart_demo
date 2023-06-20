import { SxProps, Theme } from '@mui/system';

export const selectedStyles: SxProps<Theme> = (selected) => ({
    borderColor: selected ? 'primary.main' : 'palette.grey[400]',
    boxShadow: selected ? 3 : 0
});
