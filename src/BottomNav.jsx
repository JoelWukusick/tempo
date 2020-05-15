import React from 'react';
import { Container, Grid, BottomNavigation, BottomNavigationAction, Fab, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  BottomNavigation: {
    position: "fixed",
    bottom: 0,
    width: '100%',
    height: 'auto'
  },
  gridContainer: {
    margin: theme.spacing(1)
  },
  selected: {
    flexGrow: 1,
  },
  fab: {
    verticalAlign: 'middle'
  },
  paper: {
    paddingTop: '100%'
  }

}));

export default function SearchForm() {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.BottomNavigation}>
      <Grid className={classes.gridContainer} container spacing={2}>
        <Grid container justify='left' spacing={1}>
          {[0, 1, 2, 3, 4].map(value => (
            <Grid item xs>
              <Paper className={classes.paper} >
              </Paper>
            </Grid>
          )
          )}
          <Grid item xs>
            <Fab className={classes.fab} variant='extended' >next</Fab>
          </Grid>
        </Grid>
      </Grid>
    </BottomNavigation>
  )
}