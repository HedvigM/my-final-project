import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/url';
import styled from 'styled-components';
import md5 from 'md5';

export const Profile = (member) => {
  const [detailedMember, setDetailedMember] = useState({});
  const [loading, setLoading] = useState(true);
  const memberId = useSelector((store) => store.member.memberId);

  let profileId = '';
  if (member.member) {
    profileId = member.member;
  } else {
    profileId = memberId;
  }

  useEffect(() => {
    setLoading(true);

    fetch(API_URL(`member/${profileId}`))
      .then((res) => res.json())
      .then((data) => {
        setDetailedMember(data.response);
        setLoading(false);
      });
  }, [profileId]);

  return loading ? (
    <h1>Laddar</h1>
  ) : (
    <PicNameCity>
      <Img
        src={`https://www.gravatar.com/avatar/${md5(
          detailedMember.email
        )}?d=retro`}
      />
      <NameCity>
        <h1>{detailedMember.memberName}</h1>
        <h2>{detailedMember.town}</h2>
      </NameCity>
    </PicNameCity>
  );
};

const NameCity = styled.div`
  margin: 5px;

  h1 {
    margin-bottom: 5px;
  }

  h2 {
    margin-top: 5px;
  }
`;

const Img = styled.img`
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  align-self: center;
`;

const PicNameCity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;
