import React from 'react';
import styled from 'styled-components';
import Track from './track.jsx';

const Main = styled.div`

`
const Container = styled.div`

`

function Playlist({ data }) {
  return (
    <Container>
      <Main >
        {data.map((item, i) => {
          return (
            <Track track={item} handleAdd={() => {}} />
          )
        })}
      </Main>
    </Container>
  )

}

export default Playlist;