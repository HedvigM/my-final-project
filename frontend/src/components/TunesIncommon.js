import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL, TUNE_URL } from '../utils/url';

export const TunesIncommon = (member) => {
  const [list, setList] = useState({});
  const [commonTunes, setCommonTunes] = useState([]);
  const [tuneNames, setTuneNames] = useState({});
  const detailedMember = member.member;

  const LoggedInMember = useSelector((store) => store.member.member);

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
    if (LoggedInMember.knowTunes && list.knowTunes) {
      const commonTunes = [];
      LoggedInMember.knowTunes.forEach((tuneId) => {
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
    <Container>
      <List>
        <h1>Me and {list.memberName} have this tunes in common: </h1>
        {tuneNames.map((item) => (
          <p>{item}</p>
        ))}
      </List>
    </Container>
  );
  /* } */
};

const List = styled.div``;

const Container = styled.ol``;
