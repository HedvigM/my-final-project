import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import styled from 'styled-components';
import { About } from '../components/About';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const AboutScreen = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  /* const navigate = useNavigate();
  const accessToken = useSelector((store) => store.member.accessToken);

  useEffect(() => {
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

        <InnerContainer>
          <About />
        </InnerContainer>

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
const InnerContainer = styled.div`
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
  /* background-color: #ff885e; */
  /* border: 3px solid red;*/
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }

  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }
`;
