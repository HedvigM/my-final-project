import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchTunes } from '../components/SearchTunes';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SearchTuneScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  /* const accessToken = useSelector((store) => store.member.accessToken); */

  /*  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]); */

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Container>
        <Header />
        <SearchTunes />
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
