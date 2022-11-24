import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Helmet } from 'react-helmet';
import Schedule from './components/Schedule';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './assets/theme';

function App() {
  return (
  <>
    <Helmet>
      <style>{`body { background-color: ${defaultTheme.palette.background.default}; }`}</style>
    </Helmet>
    <ThemeProvider theme={defaultTheme}>
      <Schedule></Schedule>
    </ThemeProvider>
  </>);
}

export default App;
