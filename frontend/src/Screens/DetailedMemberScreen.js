import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Profile } from '../components/Profile';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TunesIncommon } from '../components/TunesIncommon';

export const DetailedMemberScreen = () => {
  const { member } = useParams();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.member.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
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
  );
};

const Img = styled.div`
  background-image: url('/yan-ming.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0px;

  /* small laptop - */
  @media (min-width: 992px) {
    .overlay {
      background-color: #04040469;

      margin: 0px;
      width: 100%;
      height: 100%;
      padding-top: 200px;
      padding-bottom: 200px;
    }
  }
`;

const Overlay = styled.div`
  background-color: #04040469;
  margin: 0px;
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

  /* mobile */
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;
