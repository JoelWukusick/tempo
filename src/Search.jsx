import React from 'react';
import SearchForm from './SearchForm.jsx';
import { Box, List, Paper, Grid, Container, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNav from './BottomNav.jsx';
import ListCard from './ListCard.jsx';

const useStyles = makeStyles((theme) => ({
  grid: {
    opacity: 1
  },
  fabContainer: {
    textAlign: 'center'
  },
  selectedPaper: {
    paddingTop: '100%',
    backgroundColor: theme.palette.grey['700']
  }
}));

export default function Search() {
  const classes = useStyles();

  return (
    <>
      <SearchForm />
      <Box m={2} />
      <Paper  >
        <List>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(value => (
            <ListCard />
          ))}
        </List>
      </Paper>
      <BottomNav >
        <Grid className={classes.grid} container justify='space-around' spacing={1} alignItems='center'>
          {[0, 1, 2, 3, 4].map(value => (
            <Grid item xs>
              <Paper className={classes.selectedPaper} />
            </Grid>
          ))}
          <Grid item xs >
            <Container className={classes.fabContainer}>
              <Fab variant='extended' size='small'>next</Fab>
            </Container>
          </Grid>
        </Grid>
      </BottomNav>
    </>
  )
}