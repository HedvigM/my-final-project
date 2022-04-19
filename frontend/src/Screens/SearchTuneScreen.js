import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchTunes } from '../components/SearchTunes';
import { useAuth0 } from '@auth0/auth0-react';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';
import { Container } from '../components/styledComponents/Layout';

export const SearchTuneScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingLottie />;
  }

  return isAuthenticated ? (
    <Container>
      <Header />
      <SearchTunes />
      <Footer />
    </Container>
  ) : (
    navigate('/login')
  );
};
