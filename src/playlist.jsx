import React from 'react';
import styled from 'styled-components';
import Track from './track.jsx';

const Container = styled.div`
`

function Playlist({ data }) {
  return (
    <Container>
        {data.map((item, i) => {
          return (
            <Track track={item} handleAdd={() => { }} isPlaylist={true} />
          )
        })}
    </Container>
  )

}

export default Playlist;