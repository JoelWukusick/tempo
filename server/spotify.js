const { tokenAsync } = require('../spotify/clientAuth.js');
var rp = require('request-promise-native');


const getToken = (() => {
  let token;
  return async () => {
    token = token || tokenAsync();
    return token;
  }
})();

const constructQueryParams = (paramsObject) => {
  let paramsString = '';
  for (var i in paramsObject) {
    paramsString += `${i}=`;
    // if (paramsObject[i].length > 1){
    //   for (var x = 0; x < paramsObject[i].length; x++) {
    //     paramsString += paramsObject[i][x];
    //     if (x < paramsObject[i].length - 1) {
    //       paramsString += '%2C';
    //     }
    //   }
    // } else {
      paramsString += paramsObject[i];
    // }
    paramsString += '&';
  }
  paramsString = paramsString.substring(0, paramsString.length - 1);
  return(paramsString);
}

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
  getTopTracks: async (artistId, limit) => {
    let url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US${limit ? '&limit=' + limit : ''}`;
    return getSpotify(url);
  },
  getAlbums: async (artistId, limit) => {
    let url = `https://api.spotify.com/v1/artists/${artistId}/albums?market=US${limit ? '&limit=' + limit : ''}`;
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
    let paramsString = constructQueryParams(paramsObject);
    let url = `https://api.spotify.com/v1/recommendations?market=US&${paramsString}`;
    return getSpotify(url);
  }
}

