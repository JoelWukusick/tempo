import React, { useState } from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 10px;
`

function savePlaylist({ handleSave, signedIn }) {

  const [name, setName] = useState("");

  function validateForm() {
    return name.length > 0;
  }

  if (signedIn){
    return (
      <Container className="Login">
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
        {/* <a href="/login" class="btn btn-primary">Log in with Spotify</a> */}
  
      </Container>
    );
  } else {
    return null;
  };
}

export default savePlaylist;

// class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
