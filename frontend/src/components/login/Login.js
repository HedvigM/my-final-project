import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/url';
import { member } from '../../reducers/member';
import styled from 'styled-components';

export const Login = () => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin');

  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (event) => {
    event.preventDefault();
    doTheFetch();
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
    body: JSON.stringify({ memberName, password })
  };

  const doTheFetch = async () => {
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response.memberId));
            dispatch(member.actions.setMemberName(data.response.memberName));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
            dispatch(member.actions.setMember(data.response));
          });
        } else {
          batch(() => {
            dispatch(member.actions.setMemberId(null));
            dispatch(member.actions.setMemberName(null));
            dispatch(member.actions.setAccessToken(null));
            dispatch(member.actions.setMember(null));
          });
        }
      });
  };

  return (
    <>
      {/*Sign in/ Sign up Radio Buttons  */}
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
        <form onSubmit={onFormSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={memberName}
            onChange={(event) => setMemberName(event.target.value)}></input>

          {/* <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={memberEmail}
        onChange={(event) => setMemberEmail(event.target.value)}></input> */}

          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}></input>

          <button type="submit">Login</button>
        </form>
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
    /* font-family: var(--font); Aktuellt först när det finns ett typsnitt*/


  /*   @media (min-width: 0px) and (max-width: 767px) {
      max-width: 200px;
      h1 {
        font-size: 2em;
      }
    } */
}`;
