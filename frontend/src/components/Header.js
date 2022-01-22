import React from 'react';
import { SearchTunes } from './SearchTunes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = () => {
  return (
    <Container>
      <Ic>
        <Link to={'/'}>
          {' '}
          <h3>🎻My tunes</h3>
        </Link>
      </Ic>
      <Ic>
        <Link to={'/search-members'}>
          {' '}
          <h3>🔍 Search Member</h3>
        </Link>
      </Ic>

      <Ic>
        <Link to={'/search-tunes'}>
          {' '}
          <h3>🔍 Search Tune</h3>
        </Link>
      </Ic>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--secondary-color);
  color: white;
`;

const Ic = styled.div`
  padding: 10px;
`;
