import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { API_URL } from '../../utils/url';
import { member } from '../../reducers/member';
import { relations } from '../../reducers/relations';

export const Login = () => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState('');

  const [mode, setMode] = useState('signin');

  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (event) => {
    event.preventDefault();
    doTheFetch();
    fetchRelations();
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ memberName, password, email, town })
  };

  // Fetching all the member info
  const doTheFetch = async () => {
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response.memberId));
            dispatch(member.actions.setMemberName(data.response.memberName));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
            dispatch(
              member.actions.setKnowTunes([...new Set(data.response.knowTunes)])
            );
            dispatch(
              member.actions.setLearnTunes([
                ...new Set(data.response.learnTunes)
              ])
            );
            dispatch(member.actions.setEmail(data.response.email));
            dispatch(member.actions.setTown(data.response.town));
          });
        } else {
          batch(() => {
            dispatch(member.actions.setMemberId(null));
            dispatch(member.actions.setMemberName(null));
            dispatch(member.actions.setAccessToken(null));
            dispatch(member.actions.setKnowTunes(null));
            dispatch(member.actions.setLearnTunes(null));
            dispatch(member.actions.setEmail(null));
            dispatch(member.actions.setTown(null));
          });
        }
      });
  };

  // fetching all the relations
  const fetchRelations = () => {
    fetch(API_URL('relations'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(relations.actions.setRelations(data.response));
        } else {
          dispatch(relations.actions.setRelations(null));
        }
      });
  };

  return (
    <>
      <label htmlFor="signin">Sign in</label>
      <input
        id="signin"
        type="radio"
        checked={mode === 'signin'}
        onChange={() => setMode('signin')}></input>

      <label htmlFor="signup">Sign up</label>
      <input
        id="signup"
        type="radio"
        checked={mode === 'signup'}
        onChange={() => setMode('signup')}></input>
      <Div>
        {mode === 'signup' && (
          <form onSubmit={onFormSubmit}>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={memberName}
              onChange={(event) => setMemberName(event.target.value)}></input>

            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}></input>

            <input
              id="town"
              type="text"
              placeholder="In which town do you live?"
              value={town}
              onChange={(event) => setTown(event.target.value)}></input>

            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}></input>

            <button type="submit">Sign Up!</button>
          </form>
        )}

        {mode === 'signin' && (
          <form onSubmit={onFormSubmit}>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={memberName}
              onChange={(event) => setMemberName(event.target.value)}></input>

            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}></input>

            <button type="submit">Login</button>
          </form>
        )}
      </Div>
    </>
  );
};

const Div = styled.div`
  input {
    background-color: var(--main-color);
    border: none;
    border-bottom: 1px solid black;

    margin: 15px;
    padding: 5px;
    width: 300px;

    text-align: center;

    ::placeholder {
      color: black;
      opacity: 1;
    }
  }
`;
