import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from './DataContext.jsx';
import BottomNav from './BottomNav.jsx';
import ListCard from './ListCard.jsx';
import { Container, List, Box, Paper, Grid, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SavePlaylist from './SavePlaylist.jsx';



export default function Playlist() {
  const { playlist, setPage } = useContext(DataContext);



  return (
    <>
      <Container>
        <Box my={2}>
          <Grid container spacing={2} >
            <Grid item >
              <Button size='small' onClick={() => setPage('/')} component={Link} to={'/'}><ArrowBackIcon fontSize='small' />back</Button>
            </Grid>
          </Grid>
        </Box>
        {playlist.length > 0 ?
          <Box pb={10}>
            <Paper  >
              <List>
                {playlist.map(item => (
                  <ListCard item={item} clickable={false} />
                ))}
              </List>
            </Paper>
          </Box> :
          null}
      </Container>
      <BottomNav/>
    </>
  )
}
