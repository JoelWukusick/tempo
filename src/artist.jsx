import React from "react";
import styled from 'styled-components';


const Container = styled.div`
`

const Info = styled.div`
  display: inline-block;
  margin: auto;
`

const Name = styled.p`
  margin: 5px;
  font-weight: 600;
`

function Artist({ artist }) {
  return (
    <Container className='track'>
      <img src={artist.images[2] ? artist.images[2].url : null} onerror="this.onerror=null; this.src='https://tempoimages.s3.us-east-2.amazonaws.com/blank.jpg'" height='50' width='50' />
      <Info>
        <Name>
          {artist.name}
        </Name>
      </Info>
    </Container>
  );
}

export default Artist;