import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 5px;
  cursor: ${props => props.removeSeed ? '' : props.isPlaylist ? '' : 'pointer'};
`

const ImageContainer = styled.img`
  vertical-align: middle;
`

const Info = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding-left: 7px;
  padding-right: 10px;
  width: 70%;
  box-sizing: border-box;
  overflow: hidden;
`

const Artists = styled.div`
  display: inline;
`

const Artist = styled.p`
  display: inline;
  margin: auto;
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Name = styled.p`
  margin: auto;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
`

const RemoveButton = styled.button`
  text-align: right;
  display: inline;
  vertical-align: middle;
`

function Item({ item, handleAdd, removeSeed, isPlaylist }) {
  return (
    <Container removeSeed={removeSeed} className='item' onClick={handleAdd} removeSeed={removeSeed} isPlaylist={isPlaylist}>
      <ImageContainer src={item.images && item.images[2] ? item.images[2].url : 'https://tempoimages.s3.us-east-2.amazonaws.com/blank.jpg'} alt='image' height='50' width='50' />
      <Info>
        <Name>
          {item.name}
        </Name>
        <Artists>
          {item.artists ? item.artists.map((artist, i, artists) => {
            return (
              <Artist>{i === artists.length - 1 ? `${artist.name}` : `${artist.name}, `}</Artist>
            )
          }) : null}
        </Artists>
      </Info>
      {removeSeed ? <RemoveButton onClick={() => removeSeed(item)}>remove</RemoveButton> : null}
    </Container>
  );
}

export default Item;