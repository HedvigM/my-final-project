import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <Btn onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Btn>
  );
};

const Btn = styled.button`
  background-color: ${(props) => (props.delete ? '#fc6666' : 'white')};

  color: black;
  margin: 3px;
  padding: 3px;
  font-size: 15px;
  border-radius: 4px;
  border: none;
  transition-duration: 0.2s;
  box-shadow: none;
  font-family: var(--button-font);
  white-space: nowrap;

  :hover {
    background-color: white;
    color: var(--secondary-color);
    transition-duration: 0.2s;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
