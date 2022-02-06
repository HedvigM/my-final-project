import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/url';
import styled from 'styled-components';

export const Following = () => {
  const [followingMember, setFollowingMember] = useState([]);
  const memberId = useSelector((store) => store.member.memberId);
  const relations = useSelector((store) => store.relations.relations);
  console.log(relations);

  useEffect(() => {
    fetch(API_URL('relations'))
      .then((res) => res.json())
      .then((data) => {
        setFollowingMember(data.response);
      });
  }, []);

  return (
    <Text>
      <h1>The members i'm following are:</h1>
      {followingMember.map(
        (item, index) =>
          item.following === memberId && <p key={index}>{item.followed}</p>
      )}
    </Text>
  );
};

const Text = styled.div`
  h1 {
    font-size: 1.17em;
  }
`;
