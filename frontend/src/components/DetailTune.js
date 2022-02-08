import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TUNE_URL } from '../utils/url';
import abcjs from 'abcjs';
import { API_URL } from '../utils/url';

export const DetailTune = (tune) => {
  const [list, setList] = useState([]);
  const detailedTune = tune.tune;
  const [detailedTuneAsNumber, setDetailedTuneAsNumber] = useState([]);
  const [details, setDetails] = useState([]);
  const [key, setKey] = useState('');
  const [abc, setAbc] = useState(
    '|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|'
  );

  // fetching all the members from the database.
  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);

  useEffect(() => {
    Promise.all(
      fetch(TUNE_URL(detailedTune))
        .then((res) => res.json())
        .then((data) => {
          setDetails(data);
          setAbc(data.settings[0].abc);
          setKey(data.settings[0].key);
          setDetailedTuneAsNumber(data.id);
        })
    );
  }, [detailedTune]);

  let lineBreak = function (string) {
    return string.replaceAll('!', '\n');
  };

  abcjs.renderAbc('sheetMusic', lineBreak(abc), { responsive: 'resize' });

  return (
    <Container>
      <Members>
        <h1>{details.name}</h1>

        <h2>Members that knows the tune:</h2>
        {/* This function prints the members that know this specific tune */}
        {list.map(
          (item) =>
            item.knowTunes.includes(detailedTuneAsNumber) && (
              <p key={item._id}>{item.memberName}</p>
            )
        )}
      </Members>

      <Tune>
        <p>Type: {details.type}</p>
        <p>Key: {key}</p>
        <div width="100%" id="sheetMusic">
          (laddar)
        </div>
      </Tune>
    </Container>
  );
};
const Tune = styled.div`
  p {
  }
`;

const Members = styled.div`
  margin: 30px 0px;
`;

const Container = styled.div`
  color: black;
  h1 {
    margin: 0px;
  }
  h2 {
    font-size: 1.17em;
  }
`;
