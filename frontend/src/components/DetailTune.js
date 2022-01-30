import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TUNE_URL } from '../utils/url';
import abcjs from 'abcjs';

export const DetailTune = (tune) => {
  const [loading, setLoading] = useState(false);
  const detailedTune = tune.tune;
  const [details, setDetails] = useState([]);
  const [abc, setAbc] = useState(
    '|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!\nd2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!\nd2fd c2ec|defg afge|afge fdec|BABc dAFD|'
  );
  const [key, setKey] = useState('');

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
          setLoading(false);
        })
    );
  }, []);

  let lineBreak = function (abc) {
    return abc.replace(/\!/, '\n');
  };
  console.log('lineBreak', lineBreak);
  console.log('TYPE OF', typeof lineBreak);
  console.log('TYPE OF ABC', typeof abc);

  abcjs.renderAbc('sheetMusic', abc, {
    wrap: { minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 4 }
  });

  return (
    <Container>
      <>
        <h1>{details.name}</h1>
        <h2>Type: {details.type}</h2>
        <p>Key: {key}</p>
        {<p>abc: {lineBreak}</p>}
        <div id="sheetMusic">(laddar)</div>
      </>
    </Container>
  );
};

const Container = styled.div`
  color: black;
`;
