import React from 'react';
import styled from 'styled-components';

export const Cards = () => {
  const text = [
    'Gather your friends to a session',

    'Find out which tunes you and your friends have in common.',

    'Mark the tunes you know and the ones you would like to learn.'
  ];

  return (
    <CardContainer>
      {text.map((item, index) => (
        <Card key={index}>
          <Emoji>🎻</Emoji>
          <p>{item}</p>
        </Card>
      ))}
    </CardContainer>
  );
};

export const About = () => {
  const text = [
    'Keep you tunes at one place. See what tunes you and your session pal have together!'
  ];
  return text.map((item, index) => <p key={index}>{item}</p>);
};

const CardContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 10px;

  margin: 0 auto;
  height: 100%;

  @media (min-width: 0px) {
    min-width: 200px;
    max-width: 500px;
  }
  /* Liten Dator - */
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0fr;
    grid-gap: 10px;
    min-width: 334px;
    max-width: 500px;
  }
`;

const Card = styled.div`
  background-color: var(--main-color);
  padding: 0px;
  margin: 10px 0px;

  p {
    margin: 10px;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
    background-color: var(--main-color);
    padding: 5px;
    margin: 30px 0px;
  }
`;

const Emoji = styled.p`
  font-size: 3em;
  text-align: center;
`;
