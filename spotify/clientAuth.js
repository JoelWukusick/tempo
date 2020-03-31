const rp = require('request-promise-native');
const { client_id, client_secret } = require('./config.js');

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


module.exports = {
  tokenAsync: async () => {
    return rp.post(authOptions)
      .then(body => {
        return body.access_token;
      })
      .catch(err => {
        console.log(err);
        return;
      })
  }
}
