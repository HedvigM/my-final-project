import React from 'react';
import styled from 'styled-components';

export const TunesIncommon = () => {
  return (
    <Container>
      <List>
        <h1>My Friends thar also know this tune: </h1>
        <li>Olle</li>
        <li> Line</li>
        <li>Albert</li>
        <li>Jorid</li>
        <li>Jobjörn</li>
        <li>Per</li>
        <li>sune</li>
        <li>Sofia</li>
        <li>Elis</li>
        <li>Jörgunn</li>
      </List>
    </Container>
  );
};

const List = styled.div``;

const Container = styled.ol``;
