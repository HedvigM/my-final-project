import React from 'react';
import styled from 'styled-components';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DetailTune } from '../components/DetailTune';
import { FriendsKnow } from '../components/FriendsKnow';

export const ProfileScreenTwo = () => {
  return (
    <Container>
      <Header />
      <InnerContainer>
        <FriendsKnow />
      </InnerContainer>
      <Img>
        <InnerContainer>
          <DetailTune />
        </InnerContainer>
      </Img>

      <Footer />
    </Container>
  );
};

const Img = styled.div`
  background-image: url('./yan-ming.jpg');
  background-repeat: no-repeat;
  background-size: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
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
