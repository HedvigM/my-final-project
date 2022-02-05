import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { member } from '../reducers/member';
import { relations } from '../reducers/relations';
import styled from 'styled-components';
import swal from 'sweetalert';
import { DELETE } from '../utils/url';

export const Profile = () => {
  const memberName = useSelector((store) => store.member.memberName);
  const memberId = useSelector((store) => store.member.memberId);
  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);
*/

  const onDelete = (memberId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your profile file has been deleted!', {
          icon: 'success'
        });
        deleteFetch(memberId);
      } else {
        swal('Your profile is safe!');
      }
    });
  };
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  const deleteFetch = async (memberId) => {
    fetch(DELETE(memberId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(null));
            dispatch(member.actions.setMemberName(null));
            dispatch(member.actions.setAccessToken(null));
            dispatch(member.actions.setKnowTunes(null));
            dispatch(member.actions.setLearnTunes(null));
            dispatch(member.actions.setMember(null));
            dispatch(relations.actions.setRelations(null));
          });
        }
      });
  };

  /*
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  };
  */

  const onSettingClick = (memberId) => {
    console.log('hej');
  };

  return (
    <>
      <PicNameCity>
        <Img className="profile-pic" src="./profile-pic.jpg" alt="" />
        <div>
          <h1>{memberName}</h1>
          <h2>Uppsala</h2>
          <Settings onClick={onSettingClick}>Change the town</Settings>
        </div>
      </PicNameCity>

      <p>
        Soufflé gingerbread topping jujubes lemon drops tart jelly-o lollipop
        sugar plum. Muffin sweet roll croissant fruitcake candy canes tart oat
        sweet roll liquorice. Gingerbread liquorice oat cake muffin fruitcake.
        cake powder. Icing soufflé biscuit chupa chups sweet fruitcake donut
      </p>
      <button>Change the text</button>
      <Delete
        onClick={() => {
          onDelete(memberId);
        }}>
        Delete account
      </Delete>
    </>
  );
};

const Settings = styled.button``;

const Delete = styled.button`
  color: red;
`;

const Img = styled.img`
  height: 150px;
  border: 1px solid black;
  border-radius: 50%;
`;

const PicNameCity = styled.div`
  display: flex;
`;
