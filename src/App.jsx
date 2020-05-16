import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';

import UserContextProvider from './UserContextProvider.jsx'
import Cookies from 'js-cookie';
import { CssBaseline } from '@material-ui/core';
import theme from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider >
        <CssBaseline />
        <Header />
        <Main />
      </UserContextProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));