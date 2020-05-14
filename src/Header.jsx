import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  title: {
    fontWeight: '200',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar >
        <Typography variant="h5" className={classes.title}>
          TEMPO
          </Typography>
      </Toolbar>
    </AppBar>
  )
}