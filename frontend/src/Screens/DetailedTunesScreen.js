import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

import { Footer } from '../components/Footer';
import { DetailTune } from '../components/DetailTune';
import { Header } from '../components/Header';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';

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

const InnerContainer = styled.div`
  margin: 0 auto;
  height: 100%;

  /* Mobile */
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }

  /* small laptop - */
  @media (min-width: 992px) {
    min-width: 500px;
    max-width: 700px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;
