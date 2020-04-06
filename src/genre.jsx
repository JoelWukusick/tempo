import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 5px;
`

const ImageContainer = styled.img`
  vertical-align: middle;
`

const Info = styled.div`
  display: inline-block;
  margin: auto;
  padding-left: 5px;
`

const Name = styled.p`
  margin: 5px;
  font-weight: 600;
`

function Genre({ genre, handleAdd }) {
  return (
    <Container className='genre' onClick={handleAdd}>
      <ImageContainer src='https://tempoimages.s3.us-east-2.amazonaws.com/blank.jpg' height='50' width='50' />
      <Info>
        <Name>
          {genre.name}
        </Name>
      </Info>
    </Container>
  );
}

export default Genre;