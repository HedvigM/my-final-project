import React, { useState } from 'react';

export const Login = () => {
  const [memberName, setMemberName] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signup');

  const onFormSubmit = (event) => {
    event.preventDefault();

    /*  useEffect(() => {
        if (accessToken) {
          navigate('/');
        }
      }, [accessToken, navigate]); */
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
      </form>
    </>
  );
};
