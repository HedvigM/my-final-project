import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { DELETE } from '../utils/url';
import { member } from '../reducers/member';
import { relations } from '../reducers/relations';
import styled from 'styled-components';
import swal from 'sweetalert';

export const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.member.accessToken);
  console.log('accessToken', accessToken);
  const profileText = useSelector((store) => store.member.profileText);
  const memberId = useSelector((store) => store.member.memberId);

  useEffect(() => {
    console.log('useeffect settings');
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const logout = () => {
    batch(() => {
      dispatch(member.actions.setMemberId(null));
      dispatch(member.actions.setMemberName(null));
      dispatch(member.actions.setAccessToken(null));
      dispatch(member.actions.setMember(null));
      dispatch(member.actions.setKnowTunes([]));
      dispatch(member.actions.setLearnTunes([]));
      dispatch(member.actions.setMember(null));
      dispatch(member.actions.setRelations(null));
      dispatch(member.actions.setMember(null));
      dispatch(relations.actions.setRelations(null));
    });
  };

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

  return (
    <>
      <p>{profileText}</p>
      <Btn onClick={logout}>Log out</Btn>
      <Btn
        delete
        onClick={() => {
          onDelete(memberId);
        }}>
        Delete account
      </Btn>
    </>
  );
};

const Btn = styled.button`
  background-color: ${(props) => (props.delete ? '#fc6666' : 'white')};

  color: black;
  margin: 3px;
  padding: 3px;
  font-size: 15px;
  border-radius: 4px;
  border: none;
  transition-duration: 0.2s;
  box-shadow: none;
  font-family: var(--button-font);
  white-space: nowrap;

  :hover {
    background-color: white;
    color: var(--secondary-color);
    transition-duration: 0.2s;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
