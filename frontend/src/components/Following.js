import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/url';

export const Following = () => {
  const [followingMember, setFollowingMember] = useState([]);
  const relations = useSelector((store) => store.relations.following);
  const member = useSelector((store) => store.member.member);

  useEffect(() => {
    fetch(API_URL('relations'))
      .then((res) => res.json())
      .then((data) => {
        setFollowingMember(data.response);
      });
  }, []);

  return (
    <>
      <h1>People i'm following:</h1>
      {followingMember.map(
        (item, index) =>
          item.following._id === member.memberId && (
            <p key={index}>{item.followed.memberName}</p>
          )
      )}
    </>
  );
};
