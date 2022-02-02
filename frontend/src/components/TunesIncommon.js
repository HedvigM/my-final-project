import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL } from '../utils/url';

// NY ENDPOINT SOM RETURNERAR DEN VARS ID MAN STOPPAR IN.

export const TunesIncommon = (member) => {
  const [list, setList] = useState([]);
  const detailedMember = member.member;
  /*  const [loading, setLoading] = useState(false); */
  /* console.log('detailedMember', typeof detailedMember); */
  /* console.log('detailedMember', detailedMember); */
  console.log('LIST', list);
  console.log('LIST TYPE OF', typeof list.knowTunes);

  const LoggedInMember = useSelector((store) => store.member.member);
  console.log('LOGGED IN MEMBER', LoggedInMember);
  console.log('LOGGED IN MEMBER TYPE OF', typeof LoggedInMember.knowTunes);
  /* console.log('KNOW TUNES', LoggedInMember.knowTunes); */

  // async?
  useEffect(() => {
    /* setLoading(true); */

    fetch(API_URL(`member/${detailedMember}`))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
        /*  setLoading(false); */
      });
  }, [detailedMember]);

  /*   let commonTunes = [];
  console.log('Common tunes', commonTunes);

  LoggedInMember.map((item) => {
    if (item.knowTunes === list.knowTunes) {
      return commonTunes.push(item.knowTunes);
    }
  }); */

  // inloggad och detailed member -> gemensamma låtar

  /*   if (loading) {
    return <h1>LOADING</h1>;
  } */

  /* if (!loading) { */

  return (
    <Container>
      <List>
        <h1>Me and {list.memberName} have this tunes in common: </h1>
        {LoggedInMember.knowTunes}
        {list.knowTunes}
        {/*    {list.map((item) =>
          LoggedInMember.knowTunes.includes(item.knowTunes) ? (
            <h1>Hej</h1>
          ) : (
            <h1>hej då</h1>
          )
        )} */}
      </List>
    </Container>
  );
  /* } */
};

const List = styled.div``;

const Container = styled.ol``;
