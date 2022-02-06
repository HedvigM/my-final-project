import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = () => {
  return (
    <Container>
      <Ic>
        <Link to={'/'}>
          {' '}
          <h3 className="item-1">🎻 My Tunes</h3>
        </Link>
      </Ic>
      <Ic>
        <Link to={'/search-members'}>
          {' '}
          <h3 className="item-2">🔍 Member</h3>
        </Link>
      </Ic>

      <Ic>
        <Link to={'/search-tunes'}>
          {' '}
          <h3 className="item-3">🔍 Tune</h3>
        </Link>
      </Ic>
    </Container>
  );
};

const Container = styled.div`
  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }

  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--secondary-color);
  color: white;
`;

const Ic = styled.div`
  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
    .item-1 {
      grid-column: 2/1;
    }
    .item-2 {
      grid-column: 3/5;
    }
  }

  padding: 10px;
  border: 1px solid lime;

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
`;
