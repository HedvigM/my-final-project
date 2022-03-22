import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useSelector } from 'react-redux';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchMembers } from '../components/SearchMembers';
import styled from 'styled-components';

export const SearchMemberScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;
