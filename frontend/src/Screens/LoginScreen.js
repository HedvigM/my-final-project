import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { LoginAuth0 } from '../components/login/LoginAuth0';
import { Header } from '../components/Header';
import { HeroPic, Quote, SecondPic } from '../components/login/Pictures';
import { About, Cards } from '../components/login/Texts';
import { Footer } from '../components/login/Footer';
import { Logout } from '../components/login/Loguot';
import { SaveMember } from '../components/login/SaveMember';
import { LoadingLottie } from '../components/Lottie/LoadingLottie';

import {
  Container,
  InnerContainer,
  LoginInnerContainer,
  LoginContainer,
  H1
} from '../components/styledComponents/Layout';

export const LoginScreen = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingLottie />;
  }
  return !isAuthenticated ? (
    <Container>
      <HeroPic />
      <Cards />
      <Quote />

      <LoginContainer>
        <InnerContainer>
          <H1>Log in with google:</H1>
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
          <H1>This page is under development.</H1>
          <LoadingLottie />
        </InnerContainer>

        <SecondPic />
        <Logout />
        <Footer />
      </Container>
    </>
  );
};
