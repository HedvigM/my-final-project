import React from 'react';
import styled from 'styled-components';

export const MyTunes = () => {
  return (
    <Container>
      <List>
        <h1>My Tunes</h1>
        <li>One more Tune</li>
        <li>Another Tune</li>
        <li>Tune Tune Tune</li>
        <li>Boys On The Hill</li>
        <li>One more Tune</li>
        <li>One Tune</li>
        <li>One more Tune</li>
        <li>Another Tune</li>
        <li>Tune Tune Tune</li>
        <li>Boys On The Hill</li>
      </List>
    </Container>
  );
};

const List = styled.div``;

const Container = styled.ol`
  color: white;
`;
