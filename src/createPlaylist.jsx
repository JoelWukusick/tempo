import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 5px;
`

const CreateButton = styled.button`

`

function CreatePlaylist({ createPlaylist }) {
  return (
    <Container >
      <CreateButton onClick={createPlaylist} >Create Playlist</CreateButton>
    </Container>
  )
}

export default CreatePlaylist;