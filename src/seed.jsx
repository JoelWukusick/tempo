import React, { useState } from 'react';
import SearchForm from './searchForm.jsx';
import SearchResults from './searchResults.jsx';
const queryString = require('query-string');
const axios = require('axios');


function Seed() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('artist');
  const [results, setResults] = useState({ type: null, items: [] });

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

  return (
    <div>
      <SearchForm handleSubmit={handleSubmit} validateForm={validateForm} setType={setType} setQ={setQ} type={type} q={q} />
      <SearchResults data={results} />
    </div>
  )
}
export default Seed;