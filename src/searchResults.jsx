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
          if (item.type === 'genre' || item.type === 'seed_genres') {
            console.log(item)
            return (
              <div onClick={(e) => handleAdd(e, item, 'seed_genres')} >
                <h4 >
                  {item.name}
                </h4>
              </div>
            )
          } else if (item.type === 'artist' || item.type === 'seed_artists') {
            return (
              <Artist artist={item} handleAdd={e => handleAdd(e, item, 'seed_artists')} />
            )
          } else if (item.type === 'track' || item.type === 'seed_tracks') {
            return (
              <Track track={item} handleAdd={e => handleAdd(e, item, 'seed_tracks')}/>
            )
          }
        })}
      </Main>
    </Container>
  )

}

export default SearchResults;