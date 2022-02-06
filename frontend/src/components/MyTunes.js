import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL, TUNE_URL } from '../utils/url';

export const MyTunes = () => {
  const [know, setKnow] = useState([]);
  const [learn, setLearn] = useState([]);
  const [loading, setLoading] = useState(false);

  const knowTunes = useSelector((store) => store.member.knowTunes);
  const learnTunes = useSelector((store) => store.member.learnTunes);

  useEffect(() => {
    setLoading(true);

    Promise.all(
      knowTunes.map((item) =>
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
  }, [knowTunes]);

  useEffect(() => {
    setLoading(true);

    Promise.all(
      learnTunes.map((item) =>
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
  }, [learnTunes]);

  if (loading) {
    return <h1>LOADING</h1>;
  }

  if (!loading) {
    return (
      <Container>
        <div>
          <h1>Tunes I know:</h1>
          {know.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div>
          <h1>Tunes I want to learn:</h1>
          {learn.map((item, index) => (
            <p key={index}>{item}</p>
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
