import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TUNE_URL } from '../utils/url';
import abcjs from 'abcjs';
import { API_URL } from '../utils/url';

import { useSelector } from 'react-redux';

export const DetailTune = (tune) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const detailedTune = tune.tune;
  const [detailedTuneAsNumber, setDetailedTuneAsNumber] = useState([]);
  const [details, setDetails] = useState([]);
  const [key, setKey] = useState('');
  const [abc, setAbc] = useState(
    '|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|'
  );

  const knowTunes = useSelector((store) => store.member.member.knowTunes);

  // fetching all the members from the database.
  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    Promise.all(
      fetch(TUNE_URL(detailedTune))
        .then((res) => res.json())
        .then((data) => {
          console.log('DATA', data);
          setDetails(data);
          setAbc(data.settings[0].abc);
          setKey(data.settings[0].key);
          setDetailedTuneAsNumber(data.id);
          setLoading(false);
        })
    );
  }, [detailedTune]);

  let lineBreak = function (string) {
    return string.replaceAll('!', '\n');
  };

  abcjs.renderAbc('sheetMusic', lineBreak(abc));

  return (
    <Container>
      <Members>
        <h1>{details.name}</h1>
        <h1>Members that knows the tune:</h1>
        {/* This function prints the members that know this specific tune */}
        {list.map(
          (item) =>
            item.knowTunes.includes(detailedTuneAsNumber) && (
              <p>{item.memberName}</p>
            )
        )}
      </Members>

      <>
        <h2>Type: {details.type}</h2>
        <p>Key: {key}</p>
        <p>abc: {lineBreak(abc)}</p>
        <div id="sheetMusic">(laddar)</div>
      </>
    </Container>
  );
};

const Members = styled.div`
  background-color: var(--main-color);
`;

const Container = styled.div`
  color: black;
`;
