import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/url';
import { H1, P } from './styledComponents/Layout';

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
    <H1>Loading</H1>
  ) : (
    <div>
      <H1>The members i'm following are:</H1>
      {following.map((item, index) => (
        <P key={index}>{item}</P>
      ))}
    </div>
  );
};
