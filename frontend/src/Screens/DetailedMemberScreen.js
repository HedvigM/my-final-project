import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Profile } from '../components/Profile';
import { DetailMember } from '../components/DetailMember';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TunesIncommon } from '../components/TunesIncommon';

export const DetailedMemberScreen = () => {
  const navigate = useNavigate();
  const { member } = useParams();

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
        <Profile />
      </InnerContainer>
      <Img>
        <InnerContainer>
          <TunesIncommon />
        </InnerContainer>
      </Img>
      <DetailMember tune={member} />
      <Footer />
    </Container>
  );
};

const Img = styled.div`
  background-image: url('./yan-ming.jpg');
  background-repeat: no-repeat;
  background-size: cover;
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
  /* border: 3px solid red;*/
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;