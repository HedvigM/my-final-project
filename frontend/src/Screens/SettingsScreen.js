import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';

import { Settings } from '../components/Settings';
import { Profile } from '../components/Profile';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import {
  Container,
  InnerContainer,
  Img
} from '../components/styledComponents/Layout';

export const SettingsScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingLottie />;
  }

  return isAuthenticated ? (
    <Container>
      <Header />
      <InnerContainer>
        <Profile />
      </InnerContainer>
      <Img>
        <div className="overlay">
          <InnerContainer>
            <Settings />
          </InnerContainer>
        </div>
      </Img>
      <Footer />
    </Container>
  ) : (
    navigate('/login')
  );
};
