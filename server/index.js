const express = require('express');
var querystring = require('querystring');
const client = require('../server/spotify.js');
const { client_id, redirect_uri } = require('../spotify/config.js');
const cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

const app = express();
const port = 3000;
const stateKey = 'spotify_auth_state';
const redis = require('redis');
const redisCache = redis.createClient();
redisCache.on('error', (err) => {
  console.log("Error " + err);
});


app.use('/', express.static('dist'))
  .use(cookieParser())
  .use(favicon('resources/favicon.ico'));

app.get('/login', function (req, res) {
  let state = client.generateRandomString(16);
  res.cookie(stateKey, state, { httpOnly: true });
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
        let access_token = result.access_token;
        let refresh_token = result.refresh_token;
        return client.getUser(access_token)
          .then(result => {
            let id = result.id
            let query = querystring.stringify({ access_token, refresh_token, id })
            res.redirect(`/#${query}`)
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
  if (!req.query.q) {
    res.send([]);
    return;
  }
  let query = JSON.stringify(req.query);
  redisCache.get(query, (err, result) => {
    if (result) {
      res.send(result);
      return;
    } else {
      if (req.query.type === 'genre') {
        client.getGenreSeeds()
          .then(data => {
            let results = data.genres.filter(genre => genre.startsWith(req.query.q));
            results = results.map(item => { return { type: 'genre', name: item } })
            redisCache.set(query, JSON.stringify(results));
            res.send(results)
          })
      } else {
        client.search(req.query)
          .then(data => {
            let results;
            if (req.query.type === 'artist') {
              if (!data.artists.items) {
                throw ('no results');
              }
              results = (data.artists.items.map(artist => {
                return { name: artist.name, id: artist.id, images: artist.images, type: artist.type }
              }))
            } else {
              if (!data.tracks.items) {
                throw ('no results');
              }
              results = (data.tracks.items.map(track => {
                return { name: track.name, id: track.id, images: track.album.images, artists: track.artists, type: track.type }
              }))
            }
            redisCache.set(query, JSON.stringify(results));
            res.send(results);
          })
      }
    }
  })
})

app.get('/api/recommendations', (req, res) => {
  let query = JSON.stringify(req.query);
  redisCache.get(query, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      client.getRecommendations(req.query)
        .then(results => {
          if (!results.tracks) {
            throw ('no results');
          }
          results = results.tracks.map(track => {
            return { artists: track.artists, type: 'track', name: track.name, id: track.id, images: track.album.images };
          });
          redisCache.set(query, JSON.stringify(results));
          res.send(results);
        })
        .catch((err) => {
          console.log(err);
          res.send([])
        })
    }
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`));