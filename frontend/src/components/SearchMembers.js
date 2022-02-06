import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link /* , useParams */ } from 'react-router-dom';
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

  following.map((item) => {
    // if the logged in user is followed -> push the on that is following.
    if (item.followed === memberId) {
      return actualFollowing.push(item.following);
    }

    // if the logged in user is following -> push the one that the user is following.
    if (item.following === memberId) {
      return actualFollowed.push(item.followed);
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
    <div>
      <Div>
        <Container>
          <label>Search for a member</label>
          <input
            type="text"
            value={value}
            placeholder="Search 👇"
            onChange={(event) => setValue(event.target.value)}
          />
        </Container>
      </Div>

      <h1>Members</h1>
      {list
        .filter((item) => {
          if (!value) return true;
          if (item.memberName.toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        })
        .map((item, index) => (
          <Relations key={index}>
            {/* {item.memberName !== member.member.memberName &&} */}
            <Link to={`/member/${item._id}`}>
              <p>{item.memberName}</p>
            </Link>
            {actualFollowed.includes(item._id) ? (
              <>
                <p>following {item.memberName}</p>
                <Remove>
                  <button onClick={() => AddFollowHandel(item._id)}>
                    🎻 remove
                  </button>
                </Remove>
              </>
            ) : (
              <Follow>
                <button onClick={() => AddFollowHandel(item._id)}>
                  🎻 follow
                </button>
              </Follow>
            )}
            {actualFollowing.includes(item._id) && (
              <p>followed by: {item.memberName}</p>
            )}
          </Relations>
        ))}
    </div>
  );
};
const Relations = styled.div`
  border-bottom: 1px solid black;
`;

const Follow = styled.div``;
const Remove = styled.div`
  button {
    color: red;
  }
`;

const Div = styled.div`
  background-color: var(--main-color);

  input {
    background-color: var(--main-color);
    border: none;
    border-bottom: 1px solid black;

    margin: 15px;
    padding: 5px;
    width: 300px;

    /* align-self: center; */
    text-align: center;
    /* text-transform: uppercase; */


    ::placeholder {
      color: black;
      opacity: 1;
      /* font-family: var(--font); Aktuellt först när det finns ett typsnitt*/


    /*   @media (min-width: 0px) and (max-width: 767px) {
        max-width: 200px;
        h1 {
          font-size: 2em;
        }
      } */
  }
`;

const Container = styled.div`
/* a {
  color: black;
  text-decoration: none;
}
a:hover {
  /* color taken from the picture on the site */
  color: #2a6d38;
}
a:active {
  color: var(--secondary-color);
} */

background-color: var(--main-color);
text-align: center;
/*   margin-top: 20px; */
@media (min-width: 0px) and (max-width: 991px) {
  margin-top: auto;
  h1 {
    font-size: 1em;
    padding: 10px;
  }
  h3 {
    margin-top: 0px;
  }
}
@media (min-width: 992px) {
  padding: 30px;
  margin-top: 50px;
}
`;
