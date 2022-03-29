import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

export const Header = () => {
  return (
    <Container>
      <Ic className="item-1">
        <Link to={'/profile'}>
          {' '}
          <h3>🎻 My Tunes</h3>
        </Link>
      </Ic>
      <Ic className="item-2">
        <Link to={'/search-members'}>
          {' '}
          <h3>🔍 Member</h3>
        </Link>
      </Ic>

      <Ic className="item-3">
        <Link to={'/search-tunes'}>
          {' '}
          <h3>🔍 Tune</h3>
        </Link>
      </Ic>
    </Container>
  );
};

const Container = styled.div`
  /* Mobil */
  @media (min-width: 0px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: var(--secondary-color);
    color: white;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }
`;

const Ic = styled.div`
  /* Mobil */
  @media (min-width: 0px) {
    font-size: 0.8em;
  }

  padding: 10px;

  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    color: #2a6d38;
  }
  a:active {
    color: var(--main-color);
  }
  /* Liten Dator - */
  @media (min-width: 992px) {
    font-size: 1.7em;
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }
`;
