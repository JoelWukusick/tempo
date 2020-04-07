import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 5px;
  cursor: ${props => props.removeSeed ? '' : 'pointer'};
`

const ImageContainer = styled.img`
  vertical-align: middle;
`

const Info = styled.div`
  display: inline-block;
  margin: auto;
  padding-left: 5px;
  width: 70%;
`

const Name = styled.p`
  margin: 5px;
  font-weight: 600;
`

const RemoveButton = styled.button`
  text-align: right;
  display: inline;
  vertical-align: middle;
`

function Genre({ genre, handleAdd, removeSeed }) {
  return (
    <Container className='genre' onClick={handleAdd} removeSeed={removeSeed}>
      <ImageContainer src='https://tempoimages.s3.us-east-2.amazonaws.com/blank.jpg' height='50' width='50' />
      <Info>
        <Name>
          {genre.name}
        </Name>
      </Info>
      {removeSeed ? <RemoveButton onClick={() => removeSeed(genre)}>remove</RemoveButton> : null}
    </Container>
  );
}

export default Genre;