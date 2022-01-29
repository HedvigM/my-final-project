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
    'Jag som gjort webbsidan heter Hedvig Mejstedt och är själv musiker. Jag drabbas ofta av nervositet på en session när någon frågar mig om jag vill starta en låt. Nervositeten gör ofta det svårt att komma på en låt att dra igång. Jag har många gånger önskat att det fanns en app som denna, det är därför jag nu har skapat den. Jag antar att det finns fler som jag - som vill ha alla sina låtar samlade på ett ställe med noter.'
  ];
  return text.map((item, index) => <p key={index}>{item}</p>);
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;

  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;

const Card = styled.div`
  background-color: var(--main-color);
  border: 1px solid black;
  padding: 5px;
`;

const Emoji = styled.p`
  font-size: 3em;
  text-align: center;
`;
