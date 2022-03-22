import React, { useEffect } from 'react';
import { useDispatch, batch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../../utils/url';
import { member } from '../../reducers/member';
import { useNavigate } from 'react-router-dom';
import { relations } from '../../reducers/relations';

export const LoginAuth0 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (user) {
      const memberId = user.sub;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberId })
      };

      Promise.all(
        fetch(API_URL('signin'), options)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              batch(() => {
                dispatch(member.actions.setMemberId(data.response.memberId));
                dispatch(
                  member.actions.setKnowTunes([
                    ...new Set(data.response.knowTunes)
                  ])
                );
                dispatch(
                  member.actions.setLearnTunes([
                    ...new Set(data.response.learnTunes)
                  ])
                );
                dispatch(member.actions.setTown(data.response.town));
              });
            } else {
              batch(() => {
                dispatch(member.actions.setMemberId(null));
                dispatch(member.actions.setKnowTunes(null));
                dispatch(member.actions.setLearnTunes(null));
                dispatch(member.actions.setTown(null));
              });
            }
          }),

        fetch(API_URL('relations'))
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              dispatch(relations.actions.setRelations(data.response));
            } else {
              dispatch(relations.actions.setRelations(null));
            }
          })
      ); /* .then(navigate('/profile')); */
    }
  }, [user]);

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};
