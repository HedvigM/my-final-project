import React from 'react';
import { LogOutBtn } from '../styledComponents/Buttons';
import { useAuth0 } from '@auth0/auth0-react';

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <LogOutBtn onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </LogOutBtn>
  );
};
