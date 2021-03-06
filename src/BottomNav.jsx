import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { BottomNavigation, Grid, Container, Box, Fab, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from './theme.jsx';
import SeedImage from './SeedImage.jsx';
import SavePlaylist from './SavePlaylist.jsx';
import GetPlaylist from './GetPlaylist.jsx';

const useStyles = makeStyles((theme) => ({
  BottomNavigation: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      left: 72,
    },
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(2)
    },
    height: 'auto',
    backgroundColor: 'rgba(34, 42, 62, .80)'
  },
  seed: {
    maxWidth: '14vh',
    minWidth: '48px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '68px'
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '80px'
    },
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
  const { seedStack, setSeedStack, seed, setSeed, page, setPage, setControlScreen } = useContext(DataContext);
  const smallScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

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
        page === '/controls' ?
          <GetPlaylist /> :
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
                  <Fab
                    className={classes.button}
                    onClick={() => { setPage('/controls'); setControlScreen('presets') }}
                    component={Link} to={'/controls'}
                    disabled={!seedStack[0]}
                    variant='extended'
                    color='secondary'>next</Fab>
                </Grid>
              </Grid>
            </Grid>
          </Container>
      }
    </BottomNavigation >
  )
}