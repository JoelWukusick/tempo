import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 5px;
`

const ImageContainer = styled.img`
  vertical-align: middle;
`

const Info = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding-left: 5px;
`

const Artists = styled.div`
  display: inline;
`

const Artist = styled.p`
  display: inline;
  margin: auto;
  font-weight: 300;
`

const Name = styled.p`
  margin: auto;
  font-weight: 600;
`

function Track({ track, handleAdd }) {
  return (
    <Container className='track' onClick={handleAdd}>
      <ImageContainer src={track.images[2] ? track.images[2].url : null} alt='image' height='50' width='50' />
      <Info>
        <Name>
          {track.name}
        </Name>
        <Artists>
          {track.artists.map((artist, i, artists) => {
            return (
              <Artist>{i === artists.length - 1 ? `${artist.name}` : `${artist.name}, `}</Artist>
            )
          })}
        </Artists>
      </Info>
    </Container>
  );
}

export default Track;