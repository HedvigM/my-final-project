import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/url';

export const Profile = () => {
  const [following, setFollowing] = useState([]);
  console.log(following);

  const member = useSelector((store) => store.member.member);

  useEffect(() => {
    fetch(API_URL('relations'))
      .then((res) => res.json())
      .then((data) => {
        setFollowing(data.response);
      });
  }, []);

  return (
    <>
      <PicNameCity>
        <Img className="profile-pic" src="./profile-pic.jpg" alt="" />
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
      <h1>People i'm following:</h1>
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
