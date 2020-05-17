import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
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
  const data = useContext(DataContext);

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
      {data.playlist.length > 0 ?
        <Paper  >
          <List>
            {data.playlist.map(item => (
              <ListCard item={item} />
            ))}
          </List>
        </Paper> :
        null}
      <BottomNav>
        <Container className={classes.fabContainer}>
          <Fab variant='extended' size='small' color='primary' disabled={data.playlist.length === 0}>save playlist</Fab>
        </Container>
      </BottomNav>
    </>
  )
}
