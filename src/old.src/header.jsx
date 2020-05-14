import React from 'react';
import styled from 'styled-components';
import logo from '../resources/tempo_logo.png';

const Container = styled.div`

  top: 0;
  color: #fff0ea;
  background-color: #051d198a;
  width: 100%;
  `

const Logo = styled.img`
  height: 44px;
  padding: 8px;
  vertical-align: middle;
  `

const Title = styled.span`
  font-size: 32px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  letter-spacing: 7px;
  vertical-align: middle;
  padding: 7px;
`

function Header() {
  return (
    <Container>
      <Logo src={logo}/>
      <Title>
      TEMPO
      </Title>
    </Container>
  )

}

export default Header;