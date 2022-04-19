import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Profile } from '../components/Profile';
import { Following } from '../components/Following';
import { MyTunes } from '../components/MyTunes';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';

import {
  Container,
  InnerContainer,
  Color,
  Img,
  Overlay
} from '../components/styledComponents/Layout';

export const ProfileScreen = () => {
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

      <Color>
        <InnerContainer>
          <Following />
        </InnerContainer>
      </Color>

      <Img>
        <Overlay>
          <InnerContainer>
            <MyTunes />
          </InnerContainer>
        </Overlay>
      </Img>
      <Footer />
    </Container>
  ) : (
    navigate('/login')
  );
};
