import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import Help from './Help.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Button, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: '200',
    flexGrow: 1,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: '84px'
    }
  },
  toolbar: {
    minHeight: '32px'
  },
}));

export default function Header() {
  const classes = useStyles();
  const { username, setUsername } = useContext(DataContext);
  const logout = () => {
    setUsername(null);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }

  console.log(username)
  return (
    <AppBar color='primary' position='static' elevation={0}>
      <Toolbar className={classes.toolbar} disableGutters>
        <Typography color='inherit' variant="h5" className={classes.title}>
          TEMPO
        </Typography>
        {username === 'demo' ?
          <Button
            onClick={() => { setUsername(null) }}
            color="inherit">
            login</Button> :
          username ?
            <Button
              onClick={logout}
              color="inherit">
              sign out</Button> :
            null
        }
        <Help />
      </Toolbar>
    </AppBar>
  )
}