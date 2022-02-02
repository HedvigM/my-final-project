import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL } from '../utils/url';

// NY ENDPOINT SOM RETURNERAR DEN VARS ID MAN STOPPAR IN.

export const TunesIncommon = (member) => {
  const [list, setList] = useState([]);
  const detailedMember = member.member;
  /* console.log('detailedMember', typeof detailedMember); */
  /* console.log('detailedMember', detailedMember); */
  /* console.log('LIST', list); */
  /*  console.log('JOb låtar', list[2].knowTunes); */
  /* console.log('JOB TYPE OF', typeof list.memberName); */
  /* console.log('detailedMember TYPE OF', typeof detailedMember); */

  const LoggedInMember = useSelector((store) => store.member.member);
  /* console.log('LOGGED IN', LoggedInMember); */
  /* console.log('NAME', typeof LoggedInMember.memberName); */
  /* console.log('KNOW TUNES', LoggedInMember.knowTunes); */

  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);

  // inloggad och detailed member -> gemensamma låtar

  const TheDetailedMembersTunes = (detailedMember) => {
    const includes = list.memberName.includes(detailedMember);
    return;
  };

  /* console.log('THE', TheDetailedMember(detailedMember)); */

  return (
    <Container>
      <List>
        <h1>Me and {detailedMember} have this tunes in common: </h1>
        {/*   {list.map(
          (item) =>
            item.memberName.includes(detailedMember) && (
              <>
                <p key={item._id}>{item.memberName}</p>
                <p>Jobs låtar: {item.knowTunes}</p>
                <p>Loged ins låtar: {LoggedInMember.knowTunes}</p>
              </>
            )
        )} */}
      </List>
    </Container>
  );
};

const List = styled.div``;

const Container = styled.ol``;
