import React from 'react';
import styled from 'styled-components';

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
              <div>
                <img src={item.images[2] ? item.images[2].url : null} alt='image' height='60' width='60' />
                <h4>
                  {item.name}
                </h4>
              </div>
            )
          } else if (data.type === 'track') {
            return (
              <div>
              <img src={item.images[2] ? item.images[2].url : null} alt='image' height='60' width='60' />
              <h4>
                {item.name}
              </h4>
            </div>
            )
          }
        })}
      </Main>
    </Container>
  )

}

export default SearchResults;