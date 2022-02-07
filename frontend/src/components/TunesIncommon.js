import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL, TUNE_URL } from '../utils/url';

export const TunesIncommon = (member) => {
  const [list, setList] = useState({});
  const [commonTunes, setCommonTunes] = useState([]);
  const [tuneNames, setTuneNames] = useState([]);
  const detailedMember = member.member;

  const LoggedInMember = useSelector((store) => store.member.knowTunes);

  useEffect(() => {
    /* setLoading(true); */

    fetch(API_URL(`member/${detailedMember}`))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);

        /*  setLoading(false); */
      });
  }, [detailedMember]);

  useEffect(() => {
    if (LoggedInMember && list.knowTunes) {
      const commonTunes = [];
      LoggedInMember.forEach((tuneId) => {
        if (list.knowTunes.includes(tuneId)) {
          commonTunes.push(tuneId);
        }
      });
      setCommonTunes(commonTunes);
    }
  }, [LoggedInMember, list]);

  useEffect(() => {
    Promise.all(
      commonTunes.map((item) =>
        fetch(TUNE_URL(item))
          .then((res) => res.json())
          .then((data) => data.name)
      )
    ).then((tuneNames) => setTuneNames(tuneNames));
  }, [commonTunes]);

  /*   if (loading) {
    return <h1>LOADING</h1>;
  } */

  /* if (!loading) { */
  return (
    <Div>
      {tuneNames.length === 0 && (
        <div className="noTunes">
          <h1>Our common tunes are: </h1>
          <h2>¯\_(ツ)_/¯</h2>
          <p>We dont have any tunes in common yet...</p>
        </div>
      )}
      <h1>Our common tunes are: </h1>
      {tuneNames.map((item, index) => (
        <>
          <p key={index}> {item}</p>
        </>
      ))}
    </Div>
  );
  /* } */
};

const Div = styled.div`
  h1,
  h2,
  p {
    color: white;
    margin: 0px;
  }
  h1 {
    font-size: 1.17em;
    margin: 0px;
    margin-bottom: 20px;
    padding-top: 20px;
  }
  p {
    padding-bottom: 20px;
  }

  .noTunes {
    text-align: center;
  }
`;
