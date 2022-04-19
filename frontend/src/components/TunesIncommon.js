import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL, TUNE_URL } from '../utils/url';
import { Div } from './styledComponents/Layout';

export const TunesIncommon = (member) => {
  const [list, setList] = useState({});
  const [commonTunes, setCommonTunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tuneNames, setTuneNames] = useState([]);
  const detailedMember = member.member;

  const loggedInMember = useSelector((store) => store.member.knowTunes);

  useEffect(() => {
    setLoading(true);

    fetch(API_URL(`member/${detailedMember}`))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);

        setLoading(false);
      });
  }, [detailedMember]);

  useEffect(() => {
    if (loggedInMember && list.knowTunes) {
      const commonTunes = [];
      loggedInMember.forEach((tuneId) => {
        if (list.knowTunes.includes(tuneId)) {
          commonTunes.push(tuneId);
        }
      });
      setCommonTunes(commonTunes);
    }
  }, [loggedInMember, list]);

  useEffect(() => {
    Promise.all(
      commonTunes.map((item) =>
        fetch(TUNE_URL(item))
          .then((res) => res.json())
          .then((data) => data.name)
      )
    ).then((tuneNames) => setTuneNames(tuneNames));
  }, [commonTunes]);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <Div>
      {tuneNames.length === 0 && (
        <div className="noTunes">
          <h1>Our common tunes are: </h1>
          <h2>¯\_(ツ)_/¯</h2>
          <p>We dont have any tunes in common yet...</p>
        </div>
      )}
      {tuneNames.map((item, index) => (
        <>
          <p key={index}> {item}</p>
        </>
      ))}
    </Div>
  );
};
