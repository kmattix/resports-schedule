import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { ThemeProvider } from '@mui/material/styles';

import Schedule from './components/Schedule';
import Admin from './components/Admin';
import SignIn from './components/SignIn';

import { defaultTheme } from './components/global/Theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (<>
    <Helmet>
      <style>
        {`body { background-color: ${defaultTheme.palette.background.default}; }`}
      </style>
    </Helmet>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Schedule/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>);
}

export default App;