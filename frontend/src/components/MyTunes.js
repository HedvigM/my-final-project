import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL, TUNE_URL } from '../utils/url';

export const MyTunes = () => {
  const [know, setKnow] = useState([]);
  const [learn, setLearn] = useState([]);
  const [loading, setLoading] = useState(false);

  const member = useSelector((store) => store.member.member);
  /*  console.log('MEMBER-ID', member.knowTunes); */

  // the function i'm working with
  useEffect(() => {
    setLoading(true);

    Promise.all(
      member.knowTunes.map((item) =>
        fetch(TUNE_URL(item))
          .then((res) => res.json())
          .then((data) => {
            return data.name;
          })
      )
    ).then((values) => {
      setKnow(values);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    Promise.all(
      member.learnTunes.map((item) =>
        fetch(TUNE_URL(item))
          .then((res) => res.json())
          .then((data) => {
            return data.name;
          })
      )
    ).then((values) => {
      setLearn(values);
      setLoading(false);
    });
  }, []);

  // visa inte den användare som är inloggad.

  /*   console.log('SESSION', session); */

  if (loading) {
    return <h1>LOADING</h1>;
  }

  if (!loading) {
    return (
      <Container>
        <div>
          <h1>Tunes I know:</h1>
          {know.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div>
          <h1>Tunes I want to learn:</h1>
          {learn.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </Container>
    );
  }
};

const List = styled.div``;

const Container = styled.ol`
  color: white;
`;
