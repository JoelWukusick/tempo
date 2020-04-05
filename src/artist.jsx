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

function Artist({ artist, handleAdd }) {
  return (
    <Container className='track' onClick={handleAdd}>
      <ImageContainer src={artist.images[2] ? artist.images[2].url : null} onerror="this.onerror=null; this.src='https://tempoimages.s3.us-east-2.amazonaws.com/blank.jpg'" height='50' width='50' />
      <Info>
        <Name>
          {artist.name}
        </Name>
      </Info>
    </Container>
  );
}

export default Artist;