import React, { /* useEffect, */ useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

import styled from 'styled-components';
import swal from 'sweetalert';

import { relations } from '../reducers/relations';
import { DELETE, UPDATE_URL } from '../utils/url';
import { member } from '../reducers/member';
import { DeleteBtn } from './styledComponents/Buttons';

export const Settings = () => {
  const [mail, setMail] = useState('');
  const [city, setCity] = useState('');
  const [words, setWords] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const profileText = useSelector((store) => store.member.profileText);
  const town = useSelector((store) => store.member.town);
  const email = useSelector((store) => store.member.email);
  const memberId = useSelector((store) => store.member.memberId);

  const onDelete = (memberId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this profile!',
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
            dispatch(member.actions.setKnowTunes(null));
            dispatch(member.actions.setLearnTunes(null));
            dispatch(relations.actions.setRelations(null));
          });
        }
      });
  };

  let profileMail = '';
  if (mail) {
    profileMail = mail;
  } else {
    profileMail = email;
  }

  let profileCity = '';
  if (city) {
    profileCity = city;
  } else {
    profileCity = town;
  }

  let freeText = '';
  if (words) {
    freeText = words;
  } else {
    freeText = profileText;
  }

  const patch = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      memberId: memberId,
      email: profileMail,
      town: profileCity,
      profileText: freeText
    })
  };

  const onProfileUpdate = (event) => {
    setLoading(true);
    event.preventDefault();
    fetch(UPDATE_URL, patch)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setEmail(data.response.email));
            dispatch(member.actions.setTown(data.response.town));
            dispatch(member.actions.setProfileText(data.response.profileText));
            setLoading(false);
          });
        }
      });
  };
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Container>
        <form>
          <h1>Do you want to change your info?</h1>

          <p>{town}</p>
          <input
            id="town"
            type="text"
            placeholder="In which town do you live?"
            value={city}
            onChange={(event) => setCity(event.target.value)}></input>

          <p>{email}</p>
          <input
            id="email"
            type="email"
            placeholder="mail"
            value={mail}
            onChange={(event) => setMail(event.target.value)}></input>

          <p>{profileText}</p>
          <input
            id="profileText"
            type="profileText"
            placeholder="Profile text"
            value={words}
            onChange={(event) => setWords(event.target.value)}></input>
          <DeleteBtn onClick={onProfileUpdate}>Change the info!</DeleteBtn>
        </form>
      </Container>

      <DeleteBtn
        delete
        onClick={() => {
          onDelete(memberId);
        }}>
        Delete account
      </DeleteBtn>
    </>
  );
};

const Container = styled.div`
  color: white;

  p {
    font-size: 20px;
  }

  input {
    background-color: var(--secondary-color);
    border: none;
    border-bottom: 1px solid black;

    margin: 15px;
    padding: 5px;
    width: 250px;

    text-align: center;
    font-size: 16px;

    ::placeholder {
      color: white;
      opacity: 1;
    }
  }
`;
