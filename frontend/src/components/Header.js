import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

export const Header = () => {
  return (
    <Container>
      <Ic className="item-1">
        <Link to={'/'}>
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
  @media (min-width: 0px) and (max-width: 767px) {
    /*     display: grid;
    grid-template-columns: repeat(5, 1fr);

    .item-1 {
      grid-column: 2 / 3;
      color: red;
    }
    .item-2 {
      grid-column: 3 / 4;
      color: green;
    }
    .item-3 {
      grid-column: 4 / 5;
      color: blue;
    } */

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

  /*   display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--secondary-color);
  color: white; */
`;

const Ic = styled.div`
  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
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
`;
