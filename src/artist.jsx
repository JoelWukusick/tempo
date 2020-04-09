import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 5px;
  cursor: ${props => props.removeSeed ? '' :  'pointer'};
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

const RemoveButton = styled.button`
  text-align: right;
  display: inline;
  vertical-align: middle;
`

function Artist({ artist, handleAdd, removeSeed }) {
  return (
    <Container className='artist' onClick={handleAdd} removeSeed={removeSeed} >
      <ImageContainer src={artist.images[2] ? artist.images[2].url : null} onerror="this.onerror=null; this.src='https://tempoimages.s3.us-east-2.amazonaws.com/blank.jpg'" height='50' width='50' />
      <Info>
        <Name>
          {artist.name}
        </Name>
      </Info>
      {removeSeed ? <RemoveButton onClick={() => removeSeed(artist)}>remove</RemoveButton> : null}
    </Container>
  );
}

export default Artist;