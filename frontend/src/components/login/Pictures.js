import React from 'react';
import styled from 'styled-components';

export const HeroPic = () => {
  return (
    <Violin>
      <InnerContainer>
        <h1>Music App</h1>
      </InnerContainer>
    </Violin>
  );
};

export const Quote = () => {
  return (
    <Img>
      <InnerContainer>
        <h1>Be the one starting sets of tunes on your local Session. </h1>
      </InnerContainer>
    </Img>
  );
};

export const SecondPic = () => {
  return <ImgTwo></ImgTwo>;
};

const ImgTwo = styled.div`
  background-image: url('./clem.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  color: white;
  margin: 0;
`;

const Img = styled.div`
  background-image: url('./yan-ming.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  color: white;
  margin: 0;
`;

const Violin = styled.div`
  background-image: url('./ira.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;

  h1 {
    color: white;
  }
`;

const InnerContainer = styled.div`
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
  /* background-color: #ff885e; */
  /* border: 3px solid red;*/
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;
