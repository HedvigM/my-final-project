import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchMembers } from '../components/SearchMembers';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';
import { Container } from '../components/styledComponents/Layout';

export const SearchMemberScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingLottie />;
  }

  return isAuthenticated ? (
    <Container>
      <Header />
      <SearchMembers />
      <Footer />
    </Container>
  ) : (
    navigate('/login')
  );
};
