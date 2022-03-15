import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import styled from 'styled-components/macro';
import { Profile } from '../components/Profile';
import { Following } from '../components/Following';
import { MyTunes } from '../components/MyTunes';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated);
  /*  const accessToken = useSelector((store) => store.member.accessToken); */

  /*   useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
*/
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    /* accessToken && ( */
    isAuthenticated && (
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
    )
  );
};

const Color = styled.div`
  background-color: var(--main-color);
`;

const Img = styled.div`
  background-image: url('/yan-ming.jpg');
  background-repeat: no-repeat;
  background-size: cover;
`;

const Overlay = styled.div`
  background-color: #04040469;
  width: 100%;
  height: 100%;
`;

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

  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }
`;
