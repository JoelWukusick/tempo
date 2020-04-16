import React, { useState } from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 12px;
  min-width: 450px;
`

function savePlaylist({ handleSave, signedIn }) {

  const [name, setName] = useState("");

  function validateForm() {
    return name.length > 0;
  }

  if (signedIn) {
    return (
      <Container>
        <form onSubmit={(e) => handleSave(e, name)}>
          <input
            id='name'
            autoFocus
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button disabled={!validateForm()} type="submit">
            Save Playlist
            </button>
        </form>
      </Container>
    );
  } else {
    return (
      <Container>
        PLAYLIST
      </Container>
    );
  };
}

export default savePlaylist;
