import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { API_URL } from '../utils/url';

export const MyTunes = () => {
  const [list, setList] = useState([]);

  /* För att få fram låtar snarare än siffror får man fetcha populära låtar igen och mappa igenom */
  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);

  return (
    <Container>
      {list.map((item) => (
        <div key={item._id}>
          <p>{item.memberName}</p>
          <p>{item.knowTunes}</p>
        </div>
      ))}
      {/*  <List>
        <h1>My Tunes</h1>
        <li>One more Tune</li>
        <li>Another Tune</li>
        <li>Tune Tune Tune</li>
        <li>Boys On The Hill</li>
        <li>One more Tune</li>
        <li>One Tune</li>
        <li>One more Tune</li>
        <li>Another Tune</li>
        <li>Tune Tune Tune</li>
        <li>Boys On The Hill</li>
      </List> */}
    </Container>
  );
};

const List = styled.div``;

const Container = styled.ol`
  color: white;
`;
