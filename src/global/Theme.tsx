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
    },
    /*
    custom scroll bar stuff, ripped most of it from here
    https://stackoverflow.com/questions/53772429/material-ui-how-can-i-style-the-scrollbar-with-css-in-js
    */
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollbarColor: "#666666",
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                backgroundColor: "#121212",
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: "#666666",
                minHeight: 24,
                border: "3px solid #121212",
              },
              "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                backgroundColor: "#808080",
              },
              "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                backgroundColor: "#808080",
              },
              "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#808080",
              },
              "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                backgroundColor: "#808080",
              },
            },
          },
        },
      }
});