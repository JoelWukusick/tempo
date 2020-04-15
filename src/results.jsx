import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './searchForm.jsx';
import SearchResults from './searchResults.jsx'
import Playlist from './playlist.jsx';
import SavePlaylist from './savePlaylist.jsx';

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  position: absolute;
  top: 0;
  bottom: 350px;
  width: 100%;
  overflow: scroll;
  color: #fff0ea;
  font-family: 'Montserrat', sans-serif;
  color: black;
`

const Column = styled.div`

`

function Results({ handleSubmit, setType, setQ, type, q, results, handleAdd, handleSave, signedIn, playlist }) {
  return (
    <Container>
      <Column>
        <SearchForm handleSubmit={handleSubmit} setType={setType} setQ={setQ} type={type} q={q} />
        <SearchResults data={results} handleAdd={handleAdd} />
      </Column>
      <Column>
        <SavePlaylist handleSave={handleSave} signedIn={signedIn} />
        <Playlist data={playlist} />
      </Column>
    </Container>
  );
}

export default Results;

