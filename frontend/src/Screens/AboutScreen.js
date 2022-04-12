import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import styled from 'styled-components';
import { About } from '../components/About';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';

export const AboutScreen = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingLottie />;
  }

  return (
    isAuthenticated && (
      <Container>
        <Header />

        <InnerContainer>
          <About />
        </InnerContainer>

        <Footer />
      </Container>
    )
  );
};

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

  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }
`;
