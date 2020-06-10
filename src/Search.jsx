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

  function handleChange(event) {
    setQ(event.target.value);
    search(event.target.value);
  }

  function search(value, searchType = type) {
    value = value.toLowerCase();
    let stringifiedQuery = queryString.stringify({ type: searchType, q: value });
    axios({
      method: 'get',
      url: `/api/search?${stringifiedQuery}`,
      json: true
    })
      .then(results => {
        setResults(results.data)
      });
  }

  return (
    <>
      <Container >
        <form onSubmit={e => e.preventDefault()}>
          <ToggleButtonGroup
            value={type}
            exclusive
            aria-label="search type">
            <ToggleButton onClick={() => { setType('artist'); search(q, 'artist'); }} value="artist" aria-label="left aligned">
              artist
            </ToggleButton>
            <ToggleButton onClick={() => { setType('genre'); search(q, 'genre'); }} value="genre" aria-label="centered">
              genre
            </ToggleButton>
            <ToggleButton onClick={() => { setType('track'); search(q, 'track'); }} value="track" aria-label="right aligned">
              track
            </ToggleButton>
          </ToggleButtonGroup>
          <Box m={2} />
          <TextField
            noValidate
            value={q}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
            color='primary'
            id='search'
            label='search'
            variant='filled' />
        </form>
        {results.length > 0 ? <DisplayItems items={results} clickable /> : null}
      </Container >
    </>
  )
}