import React from 'react';
import SearchForm from './searchForm.jsx';

class Seed extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <SearchForm />
        {/* <SearchResults /> */}
      </div>
    )
  }
}

export default Seed;