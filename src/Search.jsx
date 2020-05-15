import React from 'react';
import SearchForm from './SearchForm.jsx';
import { Container, Grid, Button, TextField, Paper, BottomNavigation, BottomNavigationAction, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginLeft: 0,
    height: '100%'
  },
  bottomNavigation: {
    position: "fixed",
    bottom: 0,
    width: '100%'
  },
  grid: {
    flexGrow: 1,
  },
  action: {
    width: '100px',
  }
}));

export default function Search() {
  const classes = useStyles();

  return (
    <>
      <SearchForm />
      <Paper className={classes.paper} >paper</Paper>
      <BottomNavigation className={classes.bottomNavigation}>
        <Grid className={classes.grid} spacing={2}>
        </Grid>
        <Fab size='small' variant='extended'>Next</Fab>
      </BottomNavigation>
    </>
  )
}

// export default Search;