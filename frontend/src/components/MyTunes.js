import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TUNE_URL } from '../utils/url';
import { LoadingLottie } from './Lottie/LoadingLottie';
import { H1, P, ComponentContainer } from './styledComponents/Layout';

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
          .then((data) => data.name)
      )
    ).then((values) => {
      setLearn(values);
      setLoading(false);
    });
  }, [learnTunes]);

  if (loading) {
    return <LoadingLottie />;
  }

  if (!loading) {
    return (
      <ComponentContainer>
        <div>
          <H1>Tunes I know:</H1>
          {know.map((item, index) => (
            <P key={index}>{item}</P>
          ))}
        </div>

        <div>
          <H1>Tunes I want to learn:</H1>
          {learn.map((item, index) => (
            <P key={index}>{item}</P>
          ))}
        </div>
      </ComponentContainer>
    );
  }
};
