import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Login } from '../components/login/Login';
import { HeroPic, Quote, SecondPic } from '../components/login/Pictures';
import { About, Cards } from '../components/login/Texts';
import { Footer } from '../components/login/Footer';

export const LoginScreen = () => {
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.member.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <Container>
      <HeroPic />
      <Cards />
      <Quote />

      <LoginContainer>
        <InnerContainer>
          <LoginInnerContainer>
            <Login />
          </LoginInnerContainer>
        </InnerContainer>
      </LoginContainer>

      <InnerContainer>
        <About />
      </InnerContainer>

      <SecondPic />
      <Footer />
    </Container>
  );
};

const LoginInnerContainer = styled.div`
  padding: 80px 0;
`;

const LoginContainer = styled.div`
  background-color: var(--main-color);
  margin: 0;
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

  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }
`;
