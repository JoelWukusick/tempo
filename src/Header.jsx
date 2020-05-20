import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: '200',
    padding: theme.spacing(1),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    }
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar color='inherit' position="static">
      <Typography color='primary' variant="h5" className={classes.title}>
        TEMPO
      </Typography>

    </AppBar>
  )
}