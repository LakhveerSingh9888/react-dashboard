import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@store/slices/themeSlice';
import { Button } from '@components/ui/Button';

export const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleTheme())}
            className="p-2"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </Button>
    );
};
