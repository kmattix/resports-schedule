import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#333333'
        },
        primary: {
            light: '#CCCCCC',
            main: '#808080',
            dark: '#666666'
        },
    }
});