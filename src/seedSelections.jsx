import React from "react";
import styled from 'styled-components';
import SearchResults from './searchResults.jsx';


const Container = styled.div`
`


function SeedSelections({ data, removeSeed }) {
  return (
    <Container>
      <SearchResults data={data} handleAdd={() => { }} removeSeed={removeSeed} />
    </Container>
  );
}

export default SeedSelections;