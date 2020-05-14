import React from 'react';
import styled from 'styled-components';
import Item from './item.jsx';

const Container = styled.div`
`

function Playlist({ data }) {
  return (
    <Container>
        {data.map((item, i) => {
          return (
            <Item item={item} handleAdd={() => { }} isPlaylist={true} />
          )
        })}
    </Container>
  )

}

export default Playlist;