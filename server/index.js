const express = require('express');
var querystring = require('querystring');
const client = require('../server/spotify.js');
const { client_id, redirect_uri } = require('../spotify/config.js');
const cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

const port = 3000;
const cache = {};
const stateKey = 'spotify_auth_state';

var app = express();


app.use('/', express.static('dist'))
  .use(cookieParser())
  .use(favicon('resources/favicon.ico'));

app.get('/login', function (req, res) {
  let state = client.generateRandomString(16);
  res.cookie(stateKey, state
    // , { httpOnly: true }
    );
  let scope = 'playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch callback'
      }));
  } else {
    res.clearCookie(stateKey);
    client.getUserAuth(code)
      .then((result) => {
        res.cookie('access_token', result.access_token
        // , { httpOnly: true }
        );
        res.cookie('refresh_token', result.refresh_token
        // , { httpOnly: true }
        );

        return client.getUser(result.access_token)
          .then(result => {
            let id = result.id
            res.cookie('username', result.display_name
            // , { httpOnly: true }
            );
            res.redirect(`/`)
          })
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/?user=demo/#' +
          querystring.stringify({
            error: 'invalid_token'
          })
        )
      })
  }
});

app.get('/api/search', (req, res) => {
  let query = JSON.stringify(req.query);
  if (cache[query]) {
    res.send(cache[query])
  } else {
    if (req.query.type === 'genre') {
      client.getGenreSeeds()
        .then(data => {
          let results = data.genres.filter(genre => genre.startsWith(req.query.q));
          results = results.map(item => { return { type: 'genre', name: item } })
          cache[query] = results;
          res.send(results)
        })
    } else {
      client.search(req.query)
        .then(data => {
          let results;
          if (req.query.type === 'artist') {
            results = (data.artists.items.map(artist => {
              return { name: artist.name, id: artist.id, images: artist.images, type: artist.type }
            }))
          } else {
            results = (data.tracks.items.map(track => {
              return { name: track.name, id: track.id, images: track.album.images, artists: track.artists, type: track.type }
            }))
          }
          cache[query] = results;
          res.send(results)
        })
    }
  }
})

app.get('/api/recommendations', (req, res) => {
  let query = JSON.stringify(req.query);
  if (cache[query]) {
    res.send(cache[query])
  } else {
    client.getRecommendations(req.query)
      .then(results => {
        results = results.tracks.map(track => {
          return { artists: track.artists, type: 'track', name: track.name, id: track.id, images: track.album.images };
        });
        cache[query] = results;
        res.send(results)
      })
      .catch((err) => {
        console.log(err);
        res.send([])
      })
  }
})

app.listen(port, () => console.log(`Listening on port ${port}!`));