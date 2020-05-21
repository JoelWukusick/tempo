import React, { useState } from 'react';
import { Box, Container, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import DisplayItems from './DisplayItems.jsx';
import queryString from 'query-string';
import axios from 'axios';

export default function Search() {
  const [type, setType] = useState('artist');
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

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
        });
    }
    event.preventDefault();
  }

  return (
    <>
      <Container >
        <Box m={2} >
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
            <Box m={2} />
            <TextField noValidate value={q} onChange={e => { setQ(e.target.value) }} autoComplete="off" fullWidth color='primary' id='search' label={`search`} variant="filled" />
          </form>
        </Box>
        {results.length > 0 ? <DisplayItems items={results} clickable /> : null}
      </Container >
    </>
  )
}