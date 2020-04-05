const express = require('express');
const app = express();
const port = 3000;
const client = require('../server/spotify.js');
const cache = {};
app.use(express.static('dist'));

app.get('/search', (req, res) => {
  let query = JSON.stringify(req.query);
  if (cache[query]) {
    res.send(cache[query])
  } else {
    if (req.query.type === 'genre') {
      client.getGenreSeeds()
        .then(data => {
          let results = { type: req.query.type };
          results.items = data.genres.filter(genre => genre.startsWith(req.query.q));
          results.items = results.items.map(item => { return { type: 'genre', name: item } })
          cache[query] = results;
          res.send(results)
        })
    } else {
      client.search(req.query)
        .then(data => {
          let results = { type: req.query.type };
          if (req.query.type === 'artist') {
            results.items = (data.artists.items.map(artist => {
              return { name: artist.name, id: artist.id, images: artist.images, type: artist.type }
            }))
          } else {
            results.items = (data.tracks.items.map(track => {
              return { name: track.name, id: track.id, images: track.album.images, artists: track.artists, type: track.type }
            }))
          }
          cache[query] = results;
          res.send(results)
        })
    }
  }
})

app.get('/search/artist', (req, res) => {
  client.findArtist(req.query.q, 10)
    .then(result => {
      res.send(result.artists.items)
    });
})

app.get('/recommendations', (req, res) => {
  client.getRecommendations(req.query)
    .then(results => res.send(results.tracks.map(track => {
      return { name: track.name, id: track.id, thumb: track.album.images[2].url };
    })));
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