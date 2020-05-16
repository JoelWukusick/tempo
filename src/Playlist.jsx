import React from 'react';
import BottomNav from './BottomNav.jsx';
import ListCard from './ListCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Fab, List, Box, Paper, Grid, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  fabContainer: {
    textAlign: 'center'
  },
}));

export default function Playlist() {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box my={1}>
          <Grid container spacing={2} >
            <Grid item >
              <Button size='small' onClick={() => { }} ><ArrowBackIcon fontSize='small' />back</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Paper  >
        <List>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(value => (
            <ListCard />
          ))}
        </List>
      </Paper>
      <BottomNav>
        <Container className={classes.fabContainer}>
          <Fab variant='extended' size='small'>save playlist</Fab>
        </Container>
      </BottomNav>
    </>
  )
}
