import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Seed from './seed.jsx';
import styled from 'styled-components';
import Login from './login.jsx';
import Results from './results.jsx';
const queryString = require('query-string');
const axios = require('axios');

const Container = styled.div`
  min-width: 1024px;
  color: #fff0ea;
  font-family: 'Montserrat', sans-serif;
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

    // ?access_token=BQA4iu8s4SACDmXrgXK51flUue1jV_4HmVdToyZ_3V3JvKBBCUbN7W66Z4aXNAhFQTZWA9EderyPzTWCr-eApD97dYlt7FxK8LgfvhKpw0I00MSE3L7NFdwU64N51RaxaDVdz1GB-vIgbLM2XBtU42C0--edtPYVD-V3IRVk-OI3SSFa&refresh_token=AQCd4V1BzwG4qWz3qGT99Plgp56uc4oRsspZB4rVYSLcm_JFXoG80Q15ErceYf2jxwBiPGtTloxoSw5fue0E3DBR05mAQYwyKOozdZdFBSKlSJVsEf5vFNOGxD2nRpqAmZA&id=jwukusick
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
  if (path === '/user/new/') {
    return <Login />
  } else
    return (
      <Container>
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