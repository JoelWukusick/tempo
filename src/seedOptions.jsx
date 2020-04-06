import React from "react";
import styled from 'styled-components';
import Slider from './slider.jsx';

const Container = styled.div`
  padding: 10px;
`


const tempoMarks = {
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
  180: '180'
};

const marks = {
  0: 0,
  1: 10
}


function SeedOptions({ handleSlide }) {
  return (
    <Container>
      <Slider
        title='Tempo'
        id='tempo'
        min={60}
        max={180}
        defaultValue={[136, 142]}
        pushable={5}
        marks={tempoMarks}
        handleSlide={handleSlide} />
      <Slider
        title='Danceability'
        id='danceability'
        min={0}
        max={1}
        defaultValue={[0.5, 1]}
        step={.01}
        pushable={.1}
        marks={marks}
        handleSlide={handleSlide} />
      <Slider
        title='Energy'
        id='energy'
        min={0}
        max={1}
        defaultValue={[0.4, 1]}
        step={.01}
        pushable={.1}
        marks={marks}
        handleSlide={handleSlide} />
      <Slider
        title='Cheerfulness'
        id='valence'
        min={0}
        max={1}
        defaultValue={[0, 1]}
        step={.01}
        pushable={.1}
        marks={marks}
        handleSlide={handleSlide} />
    </Container>
  );
}

export default SeedOptions;