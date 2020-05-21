import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Fab } from '@material-ui/core';
import queryString from 'query-string';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function GetPlaylist() {
  const { seed, setPlaylist, seedStack, setPage } = useContext(DataContext);

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
      <Fab
        noWrap
        color='primary'
        disabled={seedStack.length === 0}
        variant='extended'
        onClick={getPlaylist}
        component={Link}
        to={'/playlist'}>get playlist</Fab>
    </>
  )
}
