import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { relations } from '../reducers/relations';
import styled from 'styled-components';
import { API_URL } from '../utils/url';
import { FOLLOW_URL } from '../utils/url';
import { Btn } from './styledComponents/Buttons';
import { LoadingLottie } from './Lottie/LoadingLottie';
import {
  Green,
  InnerComponentContainer,
  LinkStyle
} from './styledComponents/Layout';

export const SearchMembers = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
        setLoading(false);
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

  if (loading) {
    return <LoadingLottie />;
  }

  return (
    <>
      <Green>
        <InnerComponentContainer>
          <input
            className="input"
            type="text"
            value={value}
            placeholder="Search for a member 👇"
            onChange={(event) => setValue(event.target.value)}
          />
        </InnerComponentContainer>
      </Green>
      <div>
        <InnerComponentContainer>
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
                    <R>🎻 following</R>
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
        </InnerComponentContainer>
      </div>
    </>
  );
};

const R = styled.div`
  display: grid;
  justify-self: right;
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
