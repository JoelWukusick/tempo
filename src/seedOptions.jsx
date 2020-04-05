import React from "react";
import styled from 'styled-components';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const Container = styled.div`
`

function SeedOptions({ }) {
  return (
    <Container>
      <Range />
      <Range />
      <Range />
      <Range />

    </Container>
  );
}

export default SeedOptions;