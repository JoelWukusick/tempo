const express = require('express');
var querystring = require('querystring');
const client = require('../server/spotify.js');
const { client_id, redirect_uri } = require('../spotify/config.js');
var cors = require('cors');
const cookieParser = require('cookie-parser');

const port = 3000;
const cache = {};
const stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static('dist'))
  .use(cors())
  .use(cookieParser());

app.get('/login', cors(), function (req, res) {
  let state = client.generateRandomString(16);
  res.cookie(stateKey, state);
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
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    client.getUserAuth(code)
      .then((res) => {
        let access_token = res.access_token;
        let refresh_token = res.refresh_token;
        console.log(access_token, refresh_token)
      }
      );
    // }
  }
});

//     request.post(authOptions, function (error, response, body) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//           refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function (error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });






app.get('/search', (req, res) => {
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

app.get('/recommendations', (req, res) => {
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

app.get('/search/artist', (req, res) => {
  client.findArtist(req.query.q, 10)
    .then(result => {
      res.send(result.artists.items)
    });
})

app.get('/artists/:artistId/top-tracks', (req, res) => {
  client.getTopTracks(req.params.artistId, 50)
    .then(result => {
      res.send(result.tracks)
    });
})

app.get('/artists/:artistId/albums', (req, res) => {
  client.getAlbums(req.params.artistId, 50)
    .then(result => {
      res.send(result.items)
    });
})

app.get('/artists/:artistId/tracks', (req, res) => {
  client.getAlbums(req.params.artistId, 50)
    .then(result => {
      albumIds = result.items.map(album => album.id);
      return client.getTracks(albumIds);
    })
    .then((results) => {
      return client.getTracksFeatures(results);
    })
    .then((tracks) => {
      res.send(tracks)
    })
})


app.listen(port, () => console.log(`Listening on port ${port}!`));