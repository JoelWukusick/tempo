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
        console.log( err );
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