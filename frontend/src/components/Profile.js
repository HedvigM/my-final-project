import React from 'react';
import styled from 'styled-components';

export const Profile = () => {
  return (
    <>
      <PicNameCity>
        <Img class="profile-pic" src="./profile-pic.jpg" alt="" />
        <div>
          <h1>Hedvig</h1>
          <h2>Uppsala</h2>
        </div>
      </PicNameCity>
      <p>
        Soufflé gingerbread topping jujubes lemon drops tart jelly-o lollipop
        sugar plum. Muffin sweet roll croissant fruitcake candy canes tart oat
        sweet roll liquorice. Gingerbread liquorice oat cake muffin fruitcake.
        cake powder. Icing soufflé biscuit chupa chups sweet fruitcake donut
      </p>
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
