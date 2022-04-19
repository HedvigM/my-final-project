import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Footer } from '../components/Footer';
import { DetailTune } from '../components/DetailTune';
import { Header } from '../components/Header';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';
import {
  Container,
  InnerContainer
} from '../components/styledComponents/Layout';

export const DetailedTunesScreen = () => {
  const { tune } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingLottie />;
  }

  return isAuthenticated ? (
    <Container>
      <Header />
      <InnerContainer>
        <DetailTune tune={tune} />
      </InnerContainer>
      <Footer />
    </Container>
  ) : (
    navigate('/login')
  );
};
