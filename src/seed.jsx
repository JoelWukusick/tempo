import React, { useState } from 'react';
import SearchForm from './searchForm.jsx';
import SearchResults from './searchResults.jsx';
import SeedOptions from './seedOptions.jsx';
import SeedSelections from './seedSelections.jsx';
const queryString = require('query-string');
const axios = require('axios');


function Seed() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('artist');
  const [results, setResults] = useState({ type: null, items: [] });
  const [seed, setSeed] = useState({ seed_artists: [], seed_tracks: [], seed_genres: [], items: [] })

  function validateForm() {
    return q.length > 0;
  }

  function handleSubmit(event) {
    let stringifiedQuery = queryString.stringify({ type, q });
    axios({
      method: 'get',
      url: `/search?${stringifiedQuery}`,
      json: true

    })
      .then(results => {
        setResults(results.data)
      });
    event.preventDefault();
  }

  function handleAdd(e, value, type) {
    let currentSeed = seed;
    let stack = currentSeed.items;
    currentSeed[type].push(value);
    stack.push(value);
    console.log(stack.value);
    if (stack.length > 5) {
      let removeType = stack[0].type;
      currentSeed[removeType].shift();
      stack.shift();
    }
    setSeed(currentSeed);
  }

  return (
    <div>
      <SearchForm handleSubmit={handleSubmit} validateForm={validateForm} setType={setType} setQ={setQ} type={type} q={q} />
      <SearchResults data={results} handleAdd={handleAdd} />
      <SeedOptions />
      <SeedSelections data={seed} />
    </div>
  )
}
export default Seed;