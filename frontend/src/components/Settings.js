import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { member } from '../reducers/member';
import { relations } from '../reducers/relations';
import styled from 'styled-components';
import { Profile } from '../components/Profile';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.member.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const logout = () => {
    batch(() => {
      dispatch(member.actions.setMemberId(null));
      dispatch(member.actions.setMemberName(null));
      dispatch(member.actions.setAccessToken(null));
      dispatch(member.actions.setMember(null));
      dispatch(relations.actions.setRelations(null));
    });
  };

  return (
    <Container>
      <Header />
      <InnerContainer>
        <Profile />
      </InnerContainer>
      <Img>
        <button onClick={logout}>Log out</button>
      </Img>
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
