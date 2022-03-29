import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../utils/url';

export const Profile = (member) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [detailedMember, setDetailedMember] = useState({});
  const [loading, setLoading] = useState(true);
  const town = useSelector((store) => store.member.town);
  const profileText = useSelector((store) => store.member.profileText);

  let profileId = '';
  if (member.member) {
    profileId = member.member;
  } else {
    profileId = user;
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

  if (isLoading || loading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        <PicNameCity>
          <Img src={user.picture} alt={user.name} />
          <NameCity>
            <h2>{user.name}</h2>
            <h3>{town}</h3>
            <p>{profileText}</p>
            {/* Make it possible to save a town */}
            <h1>{detailedMember.memberName}</h1>
            <h2>{detailedMember.town}</h2>
          </NameCity>
        </PicNameCity>
      </>
    )
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

  /* small laptop - */
  @media (min-width: 992px) {
    margin: 5px;
    margin-left: 40px;

    h1 {
      margin-bottom: 5px;
      font-size: 4em;
    }

    h2 {
      margin-top: 5px;
      font-size: 2.5em;
    }
  }
`;

const Img = styled.img`
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  align-self: center;

  /* small laptop - */
  @media (min-width: 992px) {
    height: 200px;
  }
`;

const PicNameCity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  /* small laptop - */
  @media (min-width: 992px) {
    padding: 60px 0px;
  }
`;
