import React from "react";
import styled from 'styled-components';
import SearchResults from './searchResults.jsx';


const Container = styled.div`
  padding: 20px;
  min-width: 450px;
  overflow: hidden;
`


function SeedSelections({ data, removeSeed }) {
  return (
    <Container>
      {data.length > 0 ? <SearchResults data={data} handleAdd={() => { }} removeSeed={removeSeed} /> : <div>Add up to five artist, genre, or song seeds to inspire your playlist.</div>}
    </Container>
  );
}

export default SeedSelections;