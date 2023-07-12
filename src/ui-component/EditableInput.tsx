import React, { useEffect, useState, ChangeEvent } from 'react';
import { InputAdornment, TextField, TextFieldProps, IconButton } from '@mui/material';
import { styled } from '@mui/system';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        border: 'none',
        outline: 'none',
        paddingLeft: 0,
        background: 'transparent',
        '&:hover': {
            border: 'none'
        },
        '& fieldset': {
            border: 'none'
        }
    },
    '& .MuiOutlinedInput-root': {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        paddingLeft: 0,
        '&:hover': {
            border: 'none'
        },
        '& fieldset': {
            border: 'none',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderBottom: '1px solid #bdc8f0'
        },
        '&.Mui-focused fieldset': {
            borderBottom: '2px solid #2196f3'
        }
    }
});

export default function EditableInput({
    value,
    onChange,
    ...rest
}: Omit<TextFieldProps, 'onChange'> & { value: string | number; onChange: (value: string | number) => void }) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [initialValue, setInitialValue] = useState<string | number>('');
    // const [firstRender, set]

    useEffect(() => {
        setInitialValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (value !== initialValue) {
            setHasChanges(true);
        } else {
            setHasChanges(false);
        }
    }, [initialValue, value]);

    const onClose = () => {
        onChange(initialValue!);
        setHasChanges(false);
    };

    const onConfirm = () => {
        setInitialValue(value);
        setHasChanges(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <CustomTextField
            onFocus={() => {
                setIsEditing(true);
            }}
            onBlur={() => setIsEditing(false)}
            {...rest}
            value={value}
            onChange={handleChange}
            InputProps={{
                endAdornment:
                    isEditing || hasChanges ? (
                        <InputAdornment position="start">
                            <IconButton size="small" sx={{ mr: 1 }} color="error" onClick={onClose}>
                                <CloseIcon sx={{ fontSize: 17 }} />
                            </IconButton>
                            <IconButton size="small" color="success" onClick={onConfirm}>
                                <CheckIcon sx={{ fontSize: 17 }} />
                            </IconButton>
                        </InputAdornment>
                    ) : null
            }}
        />
    );
}
