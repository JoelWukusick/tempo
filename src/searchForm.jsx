import React, { useState } from "react";
import styled from 'styled-components';
import Results from './searchResults.jsx';
const queryString = require('query-string');
const axios = require('axios');

const SearchContainer = styled.div`
  padding: 100px;
  text-align: center;
  `

function SearchForm() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('artist');
  const [results, setResults] = useState({ type: null, items: [] });

  function validateForm() {
    return q.length > 0;
  }

  function handleSubmit(event) {
    console.log('handle submit')
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
      <SearchContainer className="Login">
        <form onSubmit={handleSubmit}>
          <label>Search For:</label>
          <select id='type' name='type' value={type} onChange={e => setType(e.target.value)}>
            <option value='artist'>Artist</option>
            <option value='genre'>Genre</option>
            <option value='track'>Track</option>
          </select>
          <input
            id='q'
            autoFocus
            type='text'
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button disabled={!validateForm()} type="submit">
            Search
          </button>
        </form>
      </SearchContainer>
      <Results data={results} />
    </div>
  );
}

export default SearchForm;