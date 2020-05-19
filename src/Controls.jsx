import React, { useState, useContext } from 'react';
import DataContext from './DataContext.jsx';
import BottomNav from './BottomNav.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Container, Fab, Grid, Button, Box } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CustomControls from './CustomControls.jsx';
import PresetControls from './PresetControls.jsx';
import queryString from 'query-string';
import axios from 'axios';


export default function Controls() {
  const { setPlaylist, seed, seedStack, setPage, controlScreen, setControlScreen } = useContext(DataContext);

  function getPlaylist() {
    setPage('/playlist');
    let q = Object.assign({}, seed);
    let artists = q.artist.map(artist => artist.id);
    if (artists[0]) { q.seed_artists = artists.join(); }
    delete q.artist;
    let genres = q.genre.map(genre => genre.name);
    if (genres[0]) { q.seed_genres = genres.join(); }
    delete q.genre;
    let tracks = q.track.map(track => track.id);
    if (tracks[0]) { q.seed_tracks = tracks.join(); }
    delete q.track;
    q.limit = 50;

    let stringifiedQuery = queryString.stringify(q);
    axios({
      method: 'get',
      url: `/api/recommendations?${stringifiedQuery}`,
      json: true
    })
      .then(results => {
        setPlaylist(results.data)
        if (results.data.length === 0) {
          alert('No results. Please widen your parameters or add more seeds.')
        }
      });
  }

  return (
    <>
      <BrowserRouter>
        <Container>
          <Box m={1} />
          <ToggleButtonGroup
            size='small'
            value={controlScreen}
            exclusive
            aria-label="search type">
            <ToggleButton onClick={() => { setControlScreen('custom') }} value='custom' component={Link} to={'/controls'} aria-label="centered">
              custom
            </ToggleButton>
            <ToggleButton onClick={() => { setControlScreen('presets') }} value='presets' component={Link} to={'/controls/preset'} aria-label="right aligned">
              preset
            </ToggleButton>
          </ToggleButtonGroup>
          <Box m={1} />
        </Container>
        <Route exact path='/controls' component={CustomControls} />
        <Route path='/controls/preset' component={PresetControls} />
      </BrowserRouter >
      <BottomNav>
        <Fab color='primary' disabled={seedStack.length === 0} variant='extended' size='small' onClick={getPlaylist} component={Link} to={'/playlist'}>get playlist</Fab>
      </BottomNav>
    </>
  )

}
