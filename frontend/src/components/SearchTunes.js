import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { member } from '../reducers/member';
import styled from 'styled-components';
import { POPULAR_URL, KNOW_TUNE_URL, LEARN_TUNE_URL } from '../utils/url';
import { Link, useParams } from 'react-router-dom';

export const SearchTunes = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  /* const [tuneId, setTuneId] = useState([]);
   */
  const memberId = useSelector((store) => store.member.memberId);
  /*  const member = useSelector((store) => store.member.member); */
  const learnTunes = useSelector((store) => store.member.learnTunes);
  const knowTunes = useSelector((store) => store.member.knowTunes);

  const { tune } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch(POPULAR_URL(pageCount))
      .then((res) => res.json())
      .then((data) => {
        setList(data.tunes);
        setLoading(false);
      });
  }, [pageCount]);

  const nextPage = () => {
    setPageCount(pageCount + 1);
  };

  const previousPage = () => {
    setPageCount(pageCount - 1);
  };

  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
    /* body: JSON.stringify({ memberId, tuneId }) */
  };

  const AddKnowTune = async (tuneId) => {
    fetch(KNOW_TUNE_URL(memberId, tuneId), options)
      .then((res) => res.json())
      .then((data) =>
        dispatch(
          member.actions.setKnowTunes([
            ...knowTunes,
            ...data.response.knowTunes
          ])
        )
      );
  };
  console.log(learnTunes);

  const AddLearnTune = async (tuneId) => {
    fetch(LEARN_TUNE_URL(memberId, tuneId), options)
      .then((res) => res.json())
      .then((data) =>
        member.actions.setLearnTunes([
          ...learnTunes,
          ...data.response.learnTunes
        ])
      );
  };

  return (
    <div>
      <Div>
        {loading ? <h1>Laddar!!</h1> : <h1>laddat</h1>}
        <Container>
          <label>Search for a Tune</label>
          <input
            type="text"
            value={value}
            placeholder="Search 👇"
            onChange={(event) => setValue(event.target.value)}
          />
        </Container>
      </Div>

      {list.map((item, index) => (
        <Tune key={index}>
          {/* The link is a part of the route, not a class name */}
          <Link to={`/details/${item.id}`}>
            <p>
              {item.name}, ({item.type})
            </p>
          </Link>

          {learnTunes.includes(item.id) ? (
            <p>I have this tune in my "want to learn pile"</p>
          ) : (
            <button onClick={() => AddLearnTune(item.id)}>
              I want to learn this tune!
            </button>
          )}
          {knowTunes.includes(item.id) ? (
            <p>I have this tune in my "tunes i know pile"</p>
          ) : (
            <button onClick={() => AddKnowTune(item.id)}>
              I know this tune!
            </button>
          )}
        </Tune>
      ))}
      <button onClick={previousPage}>Previous page</button>
      {pageCount}
      <button onClick={nextPage}>Next page</button>
    </div>
  );
};

const Tune = styled.div`
  border-bottom: 2px solid black;
`;
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
