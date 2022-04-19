import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

import { Profile } from '../components/Profile';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TunesIncommon } from '../components/TunesIncommon';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';
import {
  Container,
  InnerContainer,
  Img,
  Overlay
} from '../components/styledComponents/Layout';

export const DetailedMemberScreen = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const { member } = useParams();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingLottie />;
  }

  return isAuthenticated ? (
    <Container>
      <Header />
      <InnerContainer>
        <Profile member={member} />
      </InnerContainer>
      <Img>
        <Overlay>
          <InnerContainer>
            <TunesIncommon member={member} />
          </InnerContainer>
        </Overlay>
      </Img>

      <Footer />
    </Container>
  ) : (
    navigate('/login')
  );
};
