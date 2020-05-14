import React from "react";
import styled from 'styled-components';


const Container = styled.div`
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  padding: 150px;
`

const Click = styled.a`
  text-decoration: none;
  padding: 10px;
  margin: 25px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  cursor: pointer;
  color: #051F14;
`

function Login( ) {

  return (
    <Container className="Login">
      <Click href='/login'>Log in with Spotify</Click>
      <Click href='/user/demo' >Use without save option</Click>
    </Container>
  );
}

export default Login;