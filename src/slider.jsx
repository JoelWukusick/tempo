import React from "react";
import styled from 'styled-components';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const Container = styled.div`
  margin: 40px 0px;
`


const Title = styled.div`
  /* padding: 8px 0px; */
  display: inline-block;
`

const SliderContainer = styled.div`
  width: 80%;
  vertical-align: middle;
  float: right;
`

function Slider({ id, title, marks, defaultValue, step, min, max, pushable, handleSlide }) {
  return (
    <Container>
      <Title>
        {title}
      </Title>
      <SliderContainer>
        <Range
          min={min}
          max={max}
          defaultValue={defaultValue}
          ariaValueTextFormatterGroupForHandles={[value => `${value}`]}
          pushable={pushable}
          step={step || 1}
          marks={marks}
          onChange={(e) => handleSlide(e, id)} />
      </SliderContainer>
    </Container>
  );
}

export default Slider;