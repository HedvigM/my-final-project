import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { relations } from '../reducers/relations';
import styled from 'styled-components';
import { API_URL } from '../utils/url';
import { FOLLOW_URL } from '../utils/url';

export const SearchMembers = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  const memberId = useSelector((store) => store.member.memberId);
  const following = useSelector((store) => store.relations.relations);

  // the ones that are following me.
  let actualFollowing = [];
  let actualFollowed = [];

  following.forEach((item) => {
    // if the logged in user is followed -> push the on that is following.
    if (item.followed === memberId) {
      actualFollowing.push(item.following);
    }

    // if the logged in user is following -> push the one that the user is followed.
    if (item.following === memberId) {
      actualFollowed.push(item.followed);
    }
  });

  const dispatch = useDispatch();

  // fetching all the members from the database.
  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);

  // update the store value with the new relations..!
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  const AddFollowHandel = async (followingId) => {
    fetch(FOLLOW_URL(memberId, followingId), options)
      .then((res) => res.json())
      .then((data) =>
        dispatch(relations.actions.setRelations([...following, data.response]))
      );
  };

  return (
    <>
      <Green>
        <InnerContainer>
          <input
            className="input"
            type="text"
            value={value}
            placeholder="Search for a member 👇"
            onChange={(event) => setValue(event.target.value)}
          />
        </InnerContainer>
      </Green>
      <div>
        <InnerContainer>
          <h1>Members</h1>
          {list
            .filter(
              (item) =>
                (!value && memberId !== item._id) ||
                (item.memberName.toLowerCase().includes(value.toLowerCase()) &&
                  memberId !== item._id)
            )
            .map((item, index) => (
              <Relations key={index}>
                <LinkStyle to={`/member/${item._id}`}>
                  <p>{item.memberName}</p>
                </LinkStyle>
                <Right>
                  {actualFollowed.includes(item._id) ? (
                    <R>
                      <Btn following onClick={() => AddFollowHandel(item._id)}>
                        🎻 following
                      </Btn>
                    </R>
                  ) : (
                    <R>
                      <Btn follow onClick={() => AddFollowHandel(item._id)}>
                        🎻 follow
                      </Btn>
                    </R>
                  )}
                  {actualFollowing.includes(item._id) && (
                    <p>{item.memberName} follows you.</p>
                  )}
                </Right>
              </Relations>
            ))}
        </InnerContainer>
      </div>
    </>
  );
};

const R = styled.div`
  display: grid;
  justify-self: right;
`;

const Btn = styled.button`
  background-color: ${(props) =>
    props.follow ? 'var(--main-color)' : 'white'};

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

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  display: grid;
  justify-self: left;
  align-self: center;
`;

const Right = styled.div`
  display: grid;
  justify-self: right;
  align-self: center;

  p {
    margin: 3px;
    font-size: 12px;
    font-style: italic;
  }
`;

const Relations = styled.div`
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const InnerContainer = styled.div`
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;

  .input {
    font-size: 16px;
  }

  /* background-color: #ff885e; */
  /*  border: 1px solid pink; */

  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
    min-width: 500px;
    max-width: 700px;
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }
`;

const Green = styled.div`
background-color: var(--main-color);


  input {
    background-color: var(--main-color);
    border: none;
    border-bottom: 1px solid black;

      margin: 15px;
    padding: 5px;
    width: 300px;  

    text-align: center;
     text-transform: uppercase; 


    ::placeholder {
      color: black;
      opacity: 1;
  }
  /* Liten Dator - */
  @media (min-width: 992px) {
    margin: 100px;
    padding: 15px;
  }
`;
