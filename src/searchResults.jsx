import React from 'react';
import styled from 'styled-components';
import Item from './item.jsx';
import Track from './track.jsx';
import Artist from './artist.jsx';
import Genre from './genre.jsx';


const Container = styled.div`
`

function SearchResults({ data, handleAdd, removeSeed }) {
  return (
    <Container>
      {data.map((item, i) => {
        return (
          <Item removeSeed={removeSeed || null} item={item} handleAdd={() => handleAdd(item)} />
        )

        // if (item.type === 'genre') {
        //   return (
        //     <Genre removeSeed={removeSeed || null} genre={item} handleAdd={() => handleAdd(item)} />
        //   )
        // } else if (item.type === 'artist') {
        //   return (
        //     <Artist removeSeed={removeSeed || null} artist={item} handleAdd={() => handleAdd(item)} />
        //   )
        // } else if (item.type === 'track') {
        //   return (
        //     <Track removeSeed={removeSeed || null} track={item} handleAdd={() => handleAdd(item)} />
        //   )
        // }
      })}
    </Container>
  )

}

export default SearchResults;