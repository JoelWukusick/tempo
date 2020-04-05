import React from "react";
import styled from 'styled-components';


const Container = styled.div`
`

const Info = styled.div`
  display: inline-block;
  margin: auto;
`

const Artist = styled.p`
  margin: 5px;
  font-weight: 300;
  display: inline-block;
`
const Name = styled.p`
  margin: 5px;
  font-weight: 600;
`

function Track({ track }) {
  return (
    <Container className='track'>
      <img src={track.images[2] ? track.images[2].url : null} alt='image' height='50' width='50' />
      <Info>
        <Name>
          {track.name}
        </Name>
        <Artist>
          {track.artists.map((artist, i, artists) => {
            return (
              <Artist>{i === artists.length - 1 ? `${artist.name}` : `${artist.name}, `}</Artist>
            )
          })}
        </Artist>
      </Info>
    </Container>
  );
}

export default Track;