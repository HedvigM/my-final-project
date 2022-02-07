import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/url';
import styled from 'styled-components';
import md5 from 'md5';

// skicka in en prop från profile screen också. så kan jag återanvända koden.

export const Profile = (member) => {
  const [detailedMember, setDetailedMember] = useState({});
  const memberName = useSelector((store) => store.member.memberName);

  const email = useSelector((store) => store.member.email);
  const town = useSelector((store) => store.member.town);
  const detailedId = member.member;

  const hashedEmail = md5(email);
  const detailedEmail = detailedMember.email;
  const hashedDetailEmail = md5(detailedEmail);

  useEffect(() => {
    /* setLoading(true); */

    fetch(API_URL(`member/${detailedId}`))
      .then((res) => res.json())
      .then((data) => {
        setDetailedMember(data.response);

        /*  setLoading(false); */
      });
  }, [detailedId]);

  return (
    <>
      {detailedMember && (
        <>
          <PicNameCity>
            <Img
              src={`https://www.gravatar.com/avatar/${hashedDetailEmail}?d=retro`}
            />
            <NameCity>
              <h1>{detailedMember.memberName}</h1>
              <h2>{detailedMember.town}</h2>
            </NameCity>
          </PicNameCity>
        </>
      )}

      {!detailedMember && (
        <PicNameCity>
          <Img src={`https://www.gravatar.com/avatar/${hashedEmail}?d=retro`} />
          <NameCity>
            <h1>{memberName}</h1>
            <h2>{town}</h2>
          </NameCity>
        </PicNameCity>
      )}
    </>
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
