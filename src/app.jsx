import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div>hello world</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

//recommendation request url example - localhost:3000/recommendations?seed_artists=10GT4yz8c6xjjnPGtGPI1l%2C3WrFJ7ztbogyGnTHbHJFl2&min_tempo=135&max_tempo=142