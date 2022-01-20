import React from 'react';
import { MyTunes } from './MyTunes';
import { SearchMembers } from './SearchMembers';
import { SearchTunes } from './SearchTunes';
import styled from 'styled-components';

export const Header = () => {
  return (
    <Container>
      <Ic>
        <h3>🎻My tunes</h3>
      </Ic>
      <Ic>
        <SearchMembers />
      </Ic>

      <Ic>
        <SearchTunes />
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
