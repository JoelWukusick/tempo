import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
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
  buttonRight: {
    marginRight: 'calc((100vw - 1354px)/2)',
    [theme.breakpoints.down('md')]: {
      marginRight: '0px'
    }
  }
}));

export default function Header() {
  const classes = useStyles();
  const { username } = useContext(DataContext);
  console.log(username)
  return (
    <AppBar color='primary' position='static' elevation={0}>
      <Toolbar className={classes.toolbar} disableGutters>
        <Typography color='inherit' variant="h5" className={classes.title}>
          TEMPO
        </Typography>
        <Button color="inherit">{username === 'demo' ? 'login' : username ? 'sign out' : null}</Button>
        <Button className={classes.buttonRight} color="inherit">help</Button>
      </Toolbar>
    </AppBar>
  )
}