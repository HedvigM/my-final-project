import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';

import { About } from '../components/About';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import {
  Container,
  InnerContainer
} from '../components/styledComponents/Layout';

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
