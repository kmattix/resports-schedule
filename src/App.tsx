import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { Routes, Route, Outlet, Link, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Schedule from './components/Schedule';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './assets/theme';
import Admin from './components/Admin';

function App() {
  return (
  <>
    <Helmet>
      <style>{`body { background-color: ${defaultTheme.palette.background.default}; }`}</style>
    </Helmet>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Schedule/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>);
}

export default App;
