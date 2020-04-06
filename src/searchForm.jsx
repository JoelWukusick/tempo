import React, { useState } from "react";
import styled from 'styled-components';
import Results from './searchResults.jsx';


const SearchContainer = styled.div`
  padding: 10px;
`

function SearchForm({ handleSubmit, validateForm, setType, setQ, type, q }) {


  function validateForm() {
    return q.length > 0;
  }


  return (
    <SearchContainer className="Login">
      <form onSubmit={handleSubmit}>
        <label>{'Add Seed '}</label>
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
  );
}

export default SearchForm;