import React from 'react';
import styled from 'styled-components';

export const About = () => {
  return (
    <>
      <H1>About</H1>
      <p>
        Hey! 👋
        <br />
        <br />
        My name is Hedvig and I made this app. It’s for all of us that some
        times experience difficulties common up with tunes to start at the
        session.
        <br />
        <br />
        The idea is to save all the tunes you know, and the ones you want to
        learn. Then go to other members to se what tunes you have in common. 🎻
      </p>
    </>
  );
};
const H1 = styled.h1`
  text-align: center;
`;
