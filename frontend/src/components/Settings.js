import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { DELETE, UPDATE_URL } from '../utils/url';
import { member } from '../reducers/member';
import { relations } from '../reducers/relations';
import styled from 'styled-components';
import swal from 'sweetalert';

export const Settings = () => {
  const [mail, setMail] = useState('');
  const [city, setCity] = useState('');
  const [words, setWords] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.member.accessToken);
  console.log('accessToken', accessToken);
  const profileText = useSelector((store) => store.member.profileText);
  // const memberName = useSelector((store) => store.member.memberName);
  const town = useSelector((store) => store.member.town);
  const email = useSelector((store) => store.member.email);
  const memberId = useSelector((store) => store.member.memberId);

  useEffect(() => {
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
      dispatch(member.actions.setProfileText(null));
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
    console.log('här kör vi delete-fetchen');
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
        console.log('DATA', data.response);
        if (data.success) {
          console.log('data.success = true');
          batch(() => {
            console.log("let's batch this!!");
            console.log(data.response);
            dispatch(member.actions.setEmail(data.response.email));
            dispatch(member.actions.setTown(data.response.town));
            dispatch(member.actions.setProfileText(data.response.profileText));
            setLoading(false);
          });
        } else {
          console.log('data.success = false');
        }
      });
  };

  return loading ? (
    <h1>Loading</h1>
  ) : (
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
          <Btn onClick={onProfileUpdate}>Change the info!</Btn>
        </form>
      </Container>

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
`;

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
