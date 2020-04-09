import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 10px;
`

function Login( ) {

  return (
    <Container className="Login">
      <a href='/new/login'>Log in with Spotify</a>
      <a href='/demo' >Use without save option</a>
    </Container>
  );
}

export default Login;