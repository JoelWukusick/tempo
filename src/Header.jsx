import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: '200',
    padding: theme.spacing(.5),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginLeft: '84px'
    }
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar color='primary' position='static' elevation={0}>
      <Typography color='inherit' variant="h5" className={classes.title}>
        TEMPO
      </Typography>
    </AppBar>
  )
}