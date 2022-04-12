import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogInBtn } from '../styledComponents/Buttons';

export const LoginAuth0 = () => {
  const { loginWithRedirect } = useAuth0();

  return <LogInBtn onClick={() => loginWithRedirect()}>Log In</LogInBtn>;
};
