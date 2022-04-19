import React, { useEffect, useState } from 'react';
import { TUNE_URL } from '../utils/url';
import abcjs from 'abcjs';
import { API_URL } from '../utils/url';
import {
  H1,
  H2,
  P,
  ComponentContainer,
  Members
} from '../components/styledComponents/Layout';

export const DetailTune = (tune) => {
  const [list, setList] = useState([]);
  const [detailedTuneAsNumber, setDetailedTuneAsNumber] = useState([]);
  const [details, setDetails] = useState([]);
  const [key, setKey] = useState('');
  const [abc, setAbc] = useState(
    '|:E2BE dEBE|E2BE AFDF|E2BE dEBE|BABc dAFD:|!d2fd c2ec|defg afge|d2fd c2ec|BABc dAFA|!d2fd c2ec|defg afge|afge fdec|BABc dAFD|'
  );

  const detailedTune = tune.tune;

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

  let lineBreak = (string) => {
    return string.replaceAll('!', '\n');
  };

  abcjs.renderAbc('sheetMusic', lineBreak(abc), { responsive: 'resize' });

  return (
    <>
      <ComponentContainer>
        <Members>
          <H1>{details.name}</H1>

          <H2>Members that knows the tune:</H2>
          {/* This function prints the members that know this specific tune */}
          {list.map(
            (item) =>
              item.knowTunes.includes(detailedTuneAsNumber) && (
                <P key={item._id}>{item.memberName}</P>
              )
          )}
        </Members>
      </ComponentContainer>
      <div>
        <P>Type: {details.type}</P>
        <P>Key: {key}</P>
        <div width="100%" id="sheetMusic">
          (laddar)
        </div>
      </div>
    </>
  );
};
