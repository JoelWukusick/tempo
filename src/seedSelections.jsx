import React from "react";
import styled from 'styled-components';
import SearchResults from './searchResults.jsx';


const Container = styled.div`
`


function SeedSelections({ data }) {

  return (
    <Container>
      <SearchResults data={data} handleAdd={() => {}}/>
    </Container>
  );
}

export default SeedSelections;