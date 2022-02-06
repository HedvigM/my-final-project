import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import md5 from 'md5';

export const Profile = () => {
  const memberName = useSelector((store) => store.member.memberName);

  const email = useSelector((store) => store.member.email);
  const town = useSelector((store) => store.member.town);

  const hashedEmail = md5(email);

  return (
    <>
      <PicNameCity>
        <Img src={`https://www.gravatar.com/avatar/${hashedEmail}?d=retro`} />
        <NameCity>
          <h1>{memberName}</h1>
          <h2>{town}</h2>
        </NameCity>
      </PicNameCity>
      <Text>
        <h3>Profile Text</h3>
        <p>
          Soufflé gingerbread topping jujubes lemon drops tart jelly-o lollipop
          sugar plum. Muffin sweet roll croissant fruitcake candy canes tart
          oat.
        </p>
      </Text>
    </>
  );
};

const Text = styled.div`
  h3 {
    margin-bottom: 0px;
    margin-top: 40px;
  }
  p {
    margin-top: 5px;
  }
`;

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
