import React from 'react';
import { BottomNavigation } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  BottomNavigation: {
    position: "fixed",
    bottom: 0,
    width: '100%',
    height: 'auto',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.text.disabled
  },
}));

export default function BottomNav(props) {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.BottomNavigation}>
      {props.children}
    </BottomNavigation>
  )
}