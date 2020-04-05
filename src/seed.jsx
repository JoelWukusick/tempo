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
  const [seed, setSeed] = useState({ artist: [], track: [], genre: [], items: [] })

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

  function handleAdd(e, item) {
    seed[type].push(item);
    seed.items.push(item);
    if (seed.items.length > 5) {
      console.log('over 5')
      console.log(seed.items)
      let removeType = seed.items[0].type;
      seed[removeType].shift();
      seed.items.shift();
    }
    setSeed(Object.assign({}, seed));
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