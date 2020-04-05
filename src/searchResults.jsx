import React from 'react';
import styled from 'styled-components';
import Track from './track.jsx';
import Artist from './artist.jsx';

const Main = styled.div`

`
const Container = styled.div`

`

function SearchResults({ data }) {
  return (
    <Container>
      <Main >
        {data.items.map((item, i) => {
          if (data.type === 'genre') {
            return (
              <div>
                <h4>
                  {item}
                </h4>
              </div>
            )
          } else if (data.type === 'artist') {
            return (
              <Artist artist={item} />
            )
          } else if (data.type === 'track') {
            return (
              <Track track={item} />
            )
          }
        })}
      </Main>
    </Container>
  )

}

export default SearchResults;