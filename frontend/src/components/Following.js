import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/url';
import styled from 'styled-components';

export const Following = () => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState([]);
  const memberId = useSelector((store) => store.member.memberId);
  const relations = useSelector((store) => store.relations.relations);

  useEffect(() => {
    const followingId = [];

    relations.forEach((item) => {
      if (item.following === memberId) {
        followingId.push(item.followed);
      }
    });

    Promise.all(
      followingId.map((item) =>
        fetch(API_URL(`member/${item}`))
          .then((res) => res.json())
          .then((data) => {
            return data.response.memberName;
          })
      )
    ).then((values) => {
      setFollowing(values);
      setLoading(false);
    });
  }, [memberId, relations]);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <Text>
      <h1>The members i'm following are:</h1>
      {following.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </Text>
  );
};

const Text = styled.div`
  h1 {
    font-size: 1.17em;
  }

  /* small laptop - */
  @media (min-width: 992px) {
    h1 {
      font-size: 2em;
    }
  }
`;
