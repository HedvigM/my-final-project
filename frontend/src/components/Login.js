import React, { useState /* useEffect */ } from 'react';
import { /* useSelector, */ useDispatch, batch } from 'react-redux';
import { API_URL } from '../utils/url';
import member from '../reducers/member';

export const Login = () => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin');

  /* const accessToken = useSelector((store) => store.member.accessToken */

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    doTheFetch();
  };

  /*   useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]); */

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
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response.memberId));
            dispatch(member.actions.setMemberName(data.response.memberName));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
          });
        } else {
          batch(() => {
            dispatch(member.actions.setMemberId(null));
            dispatch(member.actions.setMemberName(null));
            dispatch(member.actions.setAccessToken(null));
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

      <form onSubmit={onFormSubmit}>
        <label htmlFor="name">Name:</label>
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

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}></input>

        <button type="submit">Login</button>
      </form>
    </>
  );
};
