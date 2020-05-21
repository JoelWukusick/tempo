import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';

import { DataProvider } from './DataContext.jsx'
import { CssBaseline } from '@material-ui/core';
import theme from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider >
        <CssBaseline />
        <Header />
        <Main />
      </DataProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));