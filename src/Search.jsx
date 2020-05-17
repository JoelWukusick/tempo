import React, { useState, useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Box, List, Paper, Grid, Container, Fab, TextField, Avatar, Badge } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BottomNav from './BottomNav.jsx';
import ListCard from './ListCard.jsx';
import queryString from 'query-string';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

  seedPaper: {
    paddingTop: '100%',
    backgroundColor: theme.palette.grey['700']
  },
  seed: {
    cursor: 'pointer'
  },
  deleteIcon: {
    color: theme.palette.primary.contrastText
  }
}));


export default function Search() {
  const classes = useStyles();
  const [type, setType] = useState('artist');
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const data = useContext(DataContext);

  function handleSubmit(event) {
    if (q) {
      let stringifiedQuery = queryString.stringify({ type, q });
      setQ('');
      axios({
        method: 'get',
        url: `/api/search?${stringifiedQuery}`,
        json: true
      })
        .then(results => {
          setResults(results.data)
          console.log(q)
        });
    }
    event.preventDefault();
  }

  function removeSeed(item) {
    let seedGenre = data.seed[item.type].filter(obj => obj.name !== item.name);
    let newSeed = Object.assign({}, data.seed);
    newSeed[item.type] = seedGenre;
    let newSeedStack = data.seedStack.filter(obj => obj.name !== item.name);
    data.setSeed(newSeed);
    data.setSeedStack(newSeedStack);
  }


  return (
    <>
      <Container >
        <Box m={1} />
        <form onSubmit={handleSubmit}>
          <ToggleButtonGroup
            size='small'
            value={type}
            exclusive
            aria-label="search type">
            <ToggleButton onClick={() => { setType('artist') }} value="artist" aria-label="left aligned">
              artist
            </ToggleButton>
            <ToggleButton onClick={() => { setType('genre') }} value="genre" aria-label="centered">
              genre
            </ToggleButton>
            <ToggleButton onClick={() => { setType('track') }} value="track" aria-label="right aligned">
              track
            </ToggleButton>
          </ToggleButtonGroup>
          <Box m={1} />
          <TextField noValidate value={q} onChange={e => { setQ(e.target.value) }} autoComplete="off" fullWidth color='primary' id='search' label={`search`} variant="filled" />
        </form>
      </Container >
      <Box m={2} />
      <Paper  >
        <List>
          {results.map(item => (
            <ListCard item={item} />
          ))}
        </List>
      </Paper>
      <BottomNav >
        <Grid container justify='center' spacing={0} alignItems='center'>
          {data.seedStack.map(item => {
            return (
              <Grid item xs={2}>
                <Box className={classes.seed} onClick={() => removeSeed(item)}>
                  <Badge badgeContent={<HighlightOffIcon className={classes.deleteIcon} />}>
                    <Avatar variant='rounded' src={item.images && item.images[2] ? item.images[2].url : null} />
                  </Badge>
                </Box>
              </Grid>
            )
          }
          )}
          <Grid item xs={2} >
            <Fab component={Link} to={'/controls'} disabled={!data.seedStack[0]} variant='extended' size='small'>next</Fab>
          </Grid>
        </Grid>
      </BottomNav>
    </>
  )
}