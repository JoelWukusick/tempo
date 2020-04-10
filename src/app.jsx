import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './searchForm.jsx';
import SearchResults from './searchResults.jsx';
import SeedOptions from './seedOptions.jsx';
import SeedSelections from './seedSelections.jsx';
import CreatePlaylist from './createPlaylist.jsx';
import Playlist from './playlist.jsx';
import SavePlaylist from './savePlaylist.jsx';
import styled from 'styled-components';
import Login from './login.jsx';
const queryString = require('query-string');
const axios = require('axios');

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`

const Column = styled.div`

`

function App() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('artist');
  const [results, setResults] = useState([]);
  const [seed, setSeed] = useState({ artist: [], track: [], genre: [], min_tempo: 136, max_tempo: 142, min_danceability: .6, max_danceability: 1, min_energy: .2, max_energy: 1, min_valence: 0, max_valence: 1 })
  const [seedStack, setSeedStack] = useState([]);
  const [playlist, setPlaylist] = useState([]);

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

  function handleSave(e, name) {    
    e.preventDefault();
    // let stringifiedQuery = queryString.stringify({ name });
    // axios({
    //   method: 'get',
    //   url: `/login`,
    //   json: true
    // })
    // .then(() => {
    //   axios({

    //   })
    // })
  }

  function handleAdd(item) {
    seed[item.type].push(item);
    seedStack.push(item);
    if (seedStack.length > 5) {
      let removeType = seedStack[0].type;
      seed[removeType].shift();
      seedStack.shift();
    }
    setSeed(Object.assign({}, seed));
    setSeedStack(Array.from(seedStack))
  }

  function handleSlide(value, key) {
    let minKey = `min_${key}`;
    let maxKey = `max_${key}`;
    seed[minKey] = value[0];
    seed[maxKey] = value[1];
    // setSeed(Object.assign({}, seed));
  }

  function createPlaylist() {
    let q = Object.assign({}, seed);
    let artists = q.artist.map(artist => artist.id);
    if (artists[0]) { q.seed_artists = artists.join(); }
    delete q.artist;
    let genres = q.genre.map(genre => genre.name);
    if (genres[0]) { q.seed_genres = genres.join(); }
    delete q.genre;
    let tracks = q.track.map(track => track.id);
    if (tracks[0]) { q.seed_tracks = tracks.join(); }
    delete q.track;
    q.limit = 50;

    let stringifiedQuery = queryString.stringify(q);
    axios({
      method: 'get',
      url: `/recommendations?${stringifiedQuery}`,
      json: true
    })
      .then(results => {
        setPlaylist(results.data)
      });
  }

  function removeSeed(item) {
    let seedGenre = seed[item.type].filter(obj => obj.name !== item.name);
    let newSeed = Object.assign({}, seed);
    newSeed[item.type] = seedGenre;
    let newSeedStack = seedStack.filter(obj => obj.name !== item.name);
    setSeed(newSeed);
    setSeedStack(newSeedStack);
    // delete seed[item.type][]
  }

  let path = window.location.pathname;
  if(path === '/user/new/'){
    return <Login/>
  } else
  return (
    <Container>
      <Column>
        <SeedOptions handleSlide={handleSlide} createPlaylist={createPlaylist} />
        <SearchForm handleSubmit={handleSubmit} setType={setType} setQ={setQ} type={type} q={q} />
        <SearchResults data={results} handleAdd={handleAdd} />
      </Column>
      <Column>
        <SeedSelections data={seedStack} removeSeed={removeSeed} />
        <CreatePlaylist createPlaylist={createPlaylist} />
        <Playlist data={playlist} />
        <SavePlaylist handleSave={handleSave} signedIn={path.split('/')[1] === 'user'}/>
      </Column>
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('App'));