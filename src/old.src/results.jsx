import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './searchForm.jsx';
import SearchResults from './searchResults.jsx'
import Playlist from './playlist.jsx';
import SavePlaylist from './savePlaylist.jsx';

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  position: absolute;
  top: 60px;
  height: 50px;
  width: 100%;
  min-width: 900px;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  position: absolute;
  top: 110px;
  bottom: 340px; 
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  color: black;
  box-sizing: border-box;
  margin: 0px;
  min-width: 900px;
  color: #051d19;
`

const Column = styled.div`
  overflow: scroll;
  text-overflow: ellipsis;
  width: 100%;
  min-width: 450px;
  box-sizing: border-box;
  padding: 0 20px;
`

function Results({ handleSubmit, setType, setQ, type, q, results, handleAdd, handleSave, signedIn, playlist }) {
  return (
    <div>
      <SearchBar>
        <SearchForm handleSubmit={handleSubmit} setType={setType} setQ={setQ} type={type} q={q} />
        <SavePlaylist handleSave={handleSave} signedIn={signedIn} />
      </SearchBar>
      <Container>
        <Column>
          <SearchResults data={results} handleAdd={handleAdd} />
        </Column>
        <Column>
          <Playlist data={playlist} />
        </Column>
      </Container>
    </div>
  );
}

export default Results;

