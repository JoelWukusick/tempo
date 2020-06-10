import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from './DataContext.jsx';
import DisplayItems from './DisplayItems.jsx';
import { Container, Box, Grid, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function Playlist() {
  const { playlist, setPage } = useContext(DataContext);

  return (
    <>
      <Container>
          <Button size='small' onClick={() => setPage('/')} component={Link} to={'/'}><ArrowBackIcon fontSize='small' />back</Button>
        {playlist.length > 0 ? <DisplayItems items={playlist} clickable={false} /> : null}
      </Container>
    </>
  )
}
