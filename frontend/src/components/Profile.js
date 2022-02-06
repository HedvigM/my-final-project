import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import md5 from 'md5';

export const Profile = () => {
  const memberName = useSelector((store) => store.member.memberName);

  const email = useSelector((store) => store.member.email);
  const town = useSelector((store) => store.member.town);

  const hashedEmail = md5(email);

  const onSettingClick = (memberId) => {
    console.log('hej');
  };

  return (
    <>
      <PicNameCity>
        <Img src={`https://www.gravatar.com/avatar/${hashedEmail}?d=retro`} />
        <div>
          <h1>{memberName}</h1>
          <h2>{town}</h2>
        </div>
      </PicNameCity>

      <p>
        Soufflé gingerbread topping jujubes lemon drops tart jelly-o lollipop
        sugar plum. Muffin sweet roll croissant fruitcake candy canes tart oat
        sweet roll liquorice. Gingerbread liquorice oat cake muffin fruitcake.
        cake powder. Icing soufflé biscuit chupa chups sweet fruitcake donut
      </p>
      <button>Change the text</button>
    </>
  );
};

const Img = styled.img`
  height: 150px;
  border: 1px solid black;
  border-radius: 50%;
`;

const PicNameCity = styled.div`
  display: flex;
`;
