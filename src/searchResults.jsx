import React from 'react';
import styled from 'styled-components';
import Track from './track.jsx';
import Artist from './artist.jsx';

const Main = styled.div`

`
const Container = styled.div`

`

function SearchResults({ data, handleAdd }) {
  return (
    <Container>
      <Main >
        {data.items.map((item, i) => {
          if (item.type === 'genre') {
            return (
              <div onClick={(e) => handleAdd(e, item)} >
                <h4 >
                  {item.name}
                </h4>
              </div>
            )
          } else if (item.type === 'artist') {
            return (
              <Artist artist={item} handleAdd={e => handleAdd(e, item)} />
            )
          } else if (item.type === 'track') {
            return (
              <Track track={item} handleAdd={e => handleAdd(e, item)}/>
            )
          }
        })}
      </Main>
    </Container>
  )

}

export default SearchResults;