import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Seed from './seed.jsx';
import styled from 'styled-components';
import Login from './login.jsx';
import Results from './results.jsx';
import Header from './header.jsx';
const queryString = require('query-string');
const axios = require('axios');

const Container = styled.div`
  min-width: 960px;
  color: #fff0ea;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
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
    let hashParams = queryString.parse(window.location.hash);
    let access_token = hashParams.access_token;
    let user_id = hashParams.id;
    let headers = {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    };
    e.preventDefault();
    if (playlist.length > 0) {
    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
      headers,
      data: {
        name
      },
      json: true
    })
      .then((res) => {
          let uris = playlist.map(track => `spotify:track:${track.id}`)
          axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/${user_id}/playlists/${res.data.id}/tracks`,
            headers,
            data: {
              uris
            },
            json: true
          })
        })
        .then(res => {
          setPlaylist([]);
          alert(`'${name}' saved as a public playlist to your spotify account.`)
        })
        .catch(err => {
          alert(`Unable to save playlist: ${err}`);
        });
        } else {
          alert('There are no songs. Please create a playlist.')
        }
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
        if ( results.data.length === 0 ) {
          alert('No results. Please widen your parameters or add more seeds.')
        }
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
  if (path === '/user/new/') {
    return (
      <div>
        <Header />
        <Login />
      </div>
    )
  } else
    return (
      <Container>
        <Header />
        <Results
          handleSubmit={handleSubmit}
          setType={setType} setQ={setQ}
          type={type} q={q}
          results={results}
          handleAdd={handleAdd}
          handleSave={handleSave}
          signedIn={path.split('/')[2] !== 'demo'}
          playlist={playlist} />
        <Seed
          handleSlide={handleSlide}
          createPlaylist={createPlaylist}
          data={seedStack}
          removeSeed={removeSeed} />
      </Container>

    )
}

ReactDOM.render(<App />, document.getElementById('App'));