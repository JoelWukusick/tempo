import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './searchForm.jsx';
import SearchResults from './searchResults.jsx'
import Playlist from './playlist.jsx';
import SavePlaylist from './savePlaylist.jsx';

const Header = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  position: absolute;
  top: 0;
  height: 70px;
  width: 100%;
  min-width: 900px;
  sizing: border-box;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  position: absolute;
  top: 70px;
  bottom: 350px;
  width: 100%;
  color: #fff0ea;
  font-family: 'Montserrat', sans-serif;
  color: black;
  box-sizing: border-box;
  margin: 0px;
  min-width: 900px;
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
      <Header>
        <SearchForm handleSubmit={handleSubmit} setType={setType} setQ={setQ} type={type} q={q} />
        <SavePlaylist handleSave={handleSave} signedIn={signedIn} />
      </Header>
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

