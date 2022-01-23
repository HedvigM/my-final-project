import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_URL } from '../utils/url';

export const SearchMembers = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);

  return (
    <div>
      <Div>
        <Container>
          <label>Search for a member</label>
          <input
            type="text"
            value={value}
            placeholder="Search 👇"
            onChange={(event) => setValue(event.target.value)}
          />
        </Container>
      </Div>

      {list
        .filter((item) => {
          if (!value) return true;
          if (item.memberName.toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        })
        .map((item) => (
          <div>
            <p>{item.memberName}</p>
            <button onClick={() => console.log('add a friend')}>
              🎻 add {item.memberName} as a friend!{' '}
            </button>
          </div>
        ))}
    </div>
  );
};
const Div = styled.div`
  background-color: var(--main-color);

  input {
    background-color: var(--main-color);
    border: none;
    border-bottom: 1px solid black;

    margin: 15px;
    padding: 5px;
    width: 300px;

    /* align-self: center; */
    text-align: center;
    /* text-transform: uppercase; */


    ::placeholder {
      color: black;
      opacity: 1;
      /* font-family: var(--font); Aktuellt först när det finns ett typsnitt*/


    /*   @media (min-width: 0px) and (max-width: 767px) {
        max-width: 200px;
        h1 {
          font-size: 2em;
        }
      } */
  }
`;

const Container = styled.div`
/* a {
  color: black;
  text-decoration: none;
}
a:hover {
  /* color taken from the picture on the site */
  color: #2a6d38;
}
a:active {
  color: var(--secondary-color);
} */

background-color: var(--main-color);
text-align: center;
/*   margin-top: 20px; */
@media (min-width: 0px) and (max-width: 991px) {
  margin-top: auto;
  h1 {
    font-size: 1em;
    padding: 10px;
  }
  h3 {
    margin-top: 0px;
  }
}
@media (min-width: 992px) {
  padding: 30px;
  margin-top: 50px;
}
`;
