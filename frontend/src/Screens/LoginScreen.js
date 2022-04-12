import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
/* import { Login } from '../components/login/Login'; */
import { LoginAuth0 } from '../components/login/LoginAuth0';
import { Header } from '../components/Header';
import { HeroPic, Quote, SecondPic } from '../components/login/Pictures';
import { About, Cards } from '../components/login/Texts';
import { Footer } from '../components/login/Footer';
import { Logout } from '../components/login/Loguot';
import { SaveMember } from '../components/login/SaveMember';

export const LoginScreen = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return !isAuthenticated ? (
    <Container>
      <HeroPic />
      <Cards />
      <Quote />

      <LoginContainer>
        <InnerContainer>
          <h1>Log in with google:</h1>
          <LoginInnerContainer>
            <LoginAuth0 />
          </LoginInnerContainer>
        </InnerContainer>
      </LoginContainer>

      <InnerContainer>
        <About />
      </InnerContainer>

      <SecondPic />
      <Footer />
    </Container>
  ) : (
    <>
      <SaveMember />
      <Header />
      <Container>
        <HeroPic />

        <InnerContainer>
          <h1>This page is under development.</h1>
        </InnerContainer>

        <SecondPic />
        <Logout />
        <Footer />
      </Container>
    </>
  );
};

const LoginInnerContainer = styled.div`
  padding: 80px 0;
  display: flex;
  justify-content: center;
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
