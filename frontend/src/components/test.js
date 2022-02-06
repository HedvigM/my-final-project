import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { member } from '../reducers/member';
import { relations } from '../reducers/relations';
import styled from 'styled-components';

export const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.member.accessToken);
  console.log('accessToken', accessToken);

  useEffect(() => {
    console.log('useeffect settings');
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
      dispatch(member.actions.setKnowTunes([]));
      dispatch(member.actions.setLearnTunes([]));
      dispatch(member.actions.setMember(null));
      dispatch(member.actions.setRelations(null));
      dispatch(member.actions.setMember(null));
      dispatch(relations.actions.setRelations(null));
    });
  };

  return <button onClick={logout}>Log out</button>;
};
