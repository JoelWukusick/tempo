import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BottomNavigation, Grid, Container, Box, Badge, Avatar, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme.js';
import SeedImage from './SeedImage.jsx';
import queryString from 'query-string';
import axios from 'axios';
import SavePlaylist from './SavePlaylist.jsx';

const useStyles = makeStyles((theme) => ({
  BottomNavigation: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      left: 100,
      padding: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3)
    },
    height: 'auto',
    backgroundColor: theme.palette.text.secondary,

  },
  seed: {
    maxWidth: '18vh'
  },
  deleteIcon: {
    color: theme.palette.primary.contrastText
  },
  button: {
    width: '100%'
  }

}));

export default function BottomNav() {
  const classes = useStyles();
  const { seedStack, setSeedStack, seed, setSeed, page, setPage, setPlaylist } = useContext(DataContext);
  const smallScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

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

  function removeSeed(item) {
    let seedGenre = seed[item.type].filter(obj => obj.name !== item.name);
    let newSeed = Object.assign({}, seed);
    newSeed[item.type] = seedGenre;
    let newSeedStack = seedStack.filter(obj => obj.name !== item.name);
    setSeed(newSeed);
    setSeedStack(newSeedStack);
  }

  return (
    <BottomNavigation className={classes.BottomNavigation}>
      {page === '/playlist' ?
        <SavePlaylist /> :
        <Container disableGutters className={classes.container}>
          <Grid container spacing={largeScreen ? 3 : 2}>
            <Grid item xs={10} container alignItems='center' justify='center' spacing={mediumScreen ? 3 : smallScreen ? 2 : 1}>
              {seedStack.map(item => (
                <Grid item xs className={classes.seed} >
                  <Box onClick={() => removeSeed(item)}>
                    <SeedImage images={item.images} name={item.name} />
                  </Box>
                </Grid>
              )
              )}
            </Grid>
            <Grid item xs={2} container alignItems='center' justify='center'>
              <Grid item xs={12}>
                {page === '/' ?
                  <Fab
                    className={classes.button}
                    onClick={() => { setPage('/controls') }}
                    component={Link} to={'/controls'}
                    disabled={!seedStack[0]}
                    variant='extended'
                    color='primary'
                    fullWidth={true}>next</Fab> :
                  <Fab
                    color='primary'
                    disabled={seedStack.length === 0}
                    variant='extended'
                    size='small'
                    onClick={getPlaylist}
                    component={Link}
                    to={'/playlist'}>get playlist</Fab>}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      }
    </BottomNavigation >
  )
}