const { tokenAsync, userAuthAsync } = require('../spotify/clientAuth.js');
const rp = require('request-promise-native');
const queryString = require('query-string');


const getToken = (() => {
  let token;
  return async (refresh) => {
    if (refresh) {
      token = tokenAsync();
      return token;
    }
    token = token || tokenAsync();
    return token;
  }
})();

const getAuth = (() => {
  let token;
  return async (code) => {
    token = userAuthAsync(code);
    return token;
  }
})();

const constructBatchParams = (key, values) => {
  let paramStrings = [];
  let paramString = `${key}=`;
  for (var i = 0; i < values.length; i++) {
    paramString += values[i]
    if ((i + 1) % 20 === 0 || i + 1 === values.length) {
      paramStrings.push(paramString);
      paramString = `${key}=`;
    } else {
      paramString += '%2C'
    }
  }
  return paramStrings;
}

const getSpotify = async (url) => {
  return getToken()
    .then((token) => {
      let options = {
        method: 'get',
        url,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      return rp(options);
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        console.log('resetting token')
        return getToken(true)
          .then((token) => {
            let options = {
              method: 'get',
              url,
              headers: {
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
            return rp(options);
          })
          .catch((err) => {
            console.log(err);
            return [];
          });
      }
      console.log(err);
      return [];
    });
}

const getTrackBunch = async (paramString) => {
  let url = `https://api.spotify.com/v1/albums?${paramString}`;
  return getSpotify(url);
}

const getAllTracks = async (albumIds) => {
  let paramStrings = constructBatchParams('ids', albumIds);
  return Promise.all(paramStrings.map((paramString) => {
    return getTrackBunch(paramString);
  }))
}

const getTrackFeaturesBunch = async (paramString) => {
  let url = `https://api.spotify.com/v1/audio-features?${paramString}`;
  return getSpotify(url);
}

const getAllTracksFeatures = async (trackIds) => {
  let paramStrings = constructBatchParams('ids', trackIds);
  return Promise.all(paramStrings.map((paramString) => {
    return getTrackFeaturesBunch(paramString);
  }))
}

module.exports = {
  findArtist: async (q, limit) => {
    let url = `https://api.spotify.com/v1/search?q=${q}&type=artist${limit ? '&limit=' + limit : ''}`;
    return getSpotify(url);
  },
  getAlbums: async (artistId, limit) => {
    let url = `https://api.spotify.com/v1/artists/${artistId}/albums?market=US${limit ? '&limit=' + limit : ''}`;
    return getSpotify(url);
  },
  getGenreSeeds: async () => {
    let url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
    return getSpotify(url);
  },
  getTopTracks: async (artistId, limit) => {
    let url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US${limit ? '&limit=' + limit : ''}`;
    return getSpotify(url);
  },
  getTracks: async (albumIds) => {
    return getAllTracks(albumIds)
      .then(data => {
        let albums = data.map(bunch => bunch.albums).flat();
        let tracks = albums.map(album => album.tracks.items).flat();
        tracks = tracks.map(track => { return { name: track.name, id: track.id } });
        return tracks;
      })
  },
  getTracksFeatures: async (tracks) => {
    let trackIds = tracks.map(track => track.id);
    return getAllTracksFeatures(trackIds)
      .then(data => {
        data = data.map(bunch => bunch.audio_features).flat();
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].features = data[i];
        }
        return tracks;
      })
  },
  getRecommendations: async (paramsObject) => {
    let paramsString = queryString.stringify(paramsObject);
    let url = `https://api.spotify.com/v1/recommendations?market=US&${paramsString}`;
    return getSpotify(url);
  },
  search: async (params) => {
    let paramsString = queryString.stringify(params);
    let url = `https://api.spotify.com/v1/search?${paramsString}`;
    return getSpotify(url);
  },
  getUser: async (access_token) => {
    let options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    return rp(options);
  },
  getUserAuth: async (code) => {
    return getAuth(code);
  },
  generateRandomString: (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

