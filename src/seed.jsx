import React, { useState } from 'react';
import styled from 'styled-components';
import SeedOptions from './seedOptions.jsx';
import SeedSelections from './seedSelections.jsx';
import CreatePlaylist from './createPlaylist.jsx';


const Container = styled.div`
  position: absolute;
  bottom: 0px; 
  display: grid;
  grid-template-columns: 50% 50%;
  color: #fff0ea;
  background-color: #093c3cae;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  height: 350px;
`

const Column = styled.div`
`

function Seed({ data, removeSeed, handleSlide, createPlaylist }) {
  return (
    <Container>
      <Column>
      <SeedSelections data={data} removeSeed={removeSeed} />
      </Column>
      <Column>
      <SeedOptions handleSlide={handleSlide} createPlaylist={createPlaylist} />
      <CreatePlaylist createPlaylist={createPlaylist} />
      </Column>
    </Container>
  );
}

export default Seed;