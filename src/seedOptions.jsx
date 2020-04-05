import React from "react";
import styled from 'styled-components';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const Container = styled.div`
  padding: 10px;
`

const Title = styled.div`
  padding: 8px 0px ;
`

const SliderContainer = styled.div`
  padding: 0px 0px 20px;
`

const marks = {
  60: '60',
  70: '70',
  80: '80',
  90: '90',
  100: '100',
  110: '110',
  120: '120',
  130: '130',
  140: '140',
  150: '150',
  160: '160',
  170: '170',
  180: '180',
  // 100: {
  //   style: {
  //     color: 'red',
  //   },
  //   label: <strong>100°C</strong>,
  // },
};

function log(value) {
  console.log(value); //eslint-disable-line
}

function SeedOptions({ }) {
  return (
    <Container>
      <Title>
        Tempo
      </Title>
      <SliderContainer>
        <Range
          min={55}
          max={185}
          defaultValue={[136, 142]}
          ariaValueTextFormatterGroupForHandles={[value => `${value}`]}
          pushable={4}
          marks={marks} onChange={log} />
      </SliderContainer>
      <Title>
        Danceability
      </Title>
      <SliderContainer>
        <Range />
      </SliderContainer>
      <Title>
        Energy
      </Title>
      <SliderContainer>
        <Range />
      </SliderContainer>
      <SliderContainer>
        <Range />
      </SliderContainer>
    </Container>
  );
}

export default SeedOptions;