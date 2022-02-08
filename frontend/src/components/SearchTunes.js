import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { member } from '../reducers/member';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {
  POPULAR_URL,
  KNOW_TUNE_URL,
  LEARN_TUNE_URL,
  SEARCH_TUNE
} from '../utils/url';
import { Link } from 'react-router-dom';

export const SearchTunes = () => {
  const [popularList, setPopularList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [value, setValue] = useState('');
  const [pageCount, setPageCount] = useState(1);

  const memberId = useSelector((store) => store.member.memberId);
  const learnTunes = useSelector((store) => store.member.learnTunes);
  const knowTunes = useSelector((store) => store.member.knowTunes);

  const dispatch = useDispatch();

  const OnSearchHandle = async () => {
    fetch(SEARCH_TUNE(value))
      .then((res) => res.json())
      .then((data) => {
        setSearchList(data.tunes);
      });
  };

  useEffect(() => {
    fetch(POPULAR_URL(pageCount))
      .then((res) => res.json())
      .then((data) => {
        setPopularList(data.tunes);
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

  const AddLearnTune = async (tuneId) => {
    fetch(LEARN_TUNE_URL(memberId, tuneId), options)
      .then((res) => res.json())
      .then((data) =>
        dispatch(
          member.actions.setLearnTunes([
            ...learnTunes,
            ...data.response.learnTunes
          ])
        )
      );
  };
  const searchedTunes = () =>
    searchList.map((item, index) => (
      <InnerContainer>
        <Tunes key={index}>
          <LinkStyle to={`/details/${item.id}`}>
            <p>
              {item.name}, ({item.type})
            </p>
          </LinkStyle>
          <Right>
            {knowTunes.includes(item.id) ? (
              <R>
                <p>❤️</p>
              </R>
            ) : (
              <R>
                <Btn onClick={() => AddKnowTune(item.id)}>Know</Btn>
              </R>
            )}

            {learnTunes.includes(item.id) ? (
              <R>
                <p>📚</p>
              </R>
            ) : (
              <R>
                <Btn onClick={() => AddLearnTune(item.id)}>Learn</Btn>
              </R>
            )}
          </Right>
        </Tunes>
      </InnerContainer>
    ));

  const popularTunes = () =>
    popularList.map((item, index) => (
      <InnerContainer>
        <Tunes key={index}>
          <LinkStyle to={`/details/${item.id}`}>
            <p>
              {item.name}, ({item.type})
            </p>
          </LinkStyle>
          <Right>
            {knowTunes.includes(item.id) ? (
              <R>
                <p>❤️</p>
              </R>
            ) : (
              <Btn onClick={() => AddKnowTune(item.id)}>Know</Btn>
            )}

            {learnTunes.includes(item.id) ? (
              <R>
                <p>📚</p>
              </R>
            ) : (
              <R>
                <Btn onClick={() => AddLearnTune(item.id)}>Learn</Btn>
              </R>
            )}
          </Right>
        </Tunes>
      </InnerContainer>
    ));

  return (
    <div>
      <Green>
        <InnerContainer>
          <input
            type="text"
            value={value}
            placeholder="Type in a tune 👇"
            onChange={(event) => setValue(event.target.value)}
          />
          <Btn className="search" onClick={OnSearchHandle}>
            Search!
          </Btn>
        </InnerContainer>
      </Green>

      {value ? searchedTunes() : popularTunes()}
      <InnerContainer>
        <Pagination>
          <Btn onClick={previousPage}>Previous</Btn>
          {pageCount}
          <Btn onClick={nextPage}>Next</Btn>
        </Pagination>
      </InnerContainer>
    </div>
  );
};

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  display: grid;
  justify-self: left;
  align-self: center;
`;

const Btn = styled.button`
  /*  background-color: ${(props) =>
    props.pagination ? 'var(--main-color)' : 'var(--secondary-color)'}; */

  background-color: var(--main-color);

  color: black;
  margin: 3px;
  width: 70px;
  padding: 3px;
  font-size: 15px;
  border-radius: 4px;
  border: none;
  transition-duration: 0.2s;
  box-shadow: none;
  font-family: var(--button-font);
  white-space: nowrap;

  :hover {
    background-color: white;
    color: var(--secondary-color);
    transition-duration: 0.2s;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
const R = styled.div`
  display: grid;
  justify-self: right;
`;

const Right = styled.div`
  display: grid;
  justify-self: right;
  align-self: center;

  p {
    margin: 3px;
    font-size: 12px;
    font-style: italic;
  }
`;

const Tunes = styled.div`
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
`;

const InnerContainer = styled.div`
  min-width: 334px;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;

  .search {
    background-color: var(--secondary-color);
    color: white;
  }

  /* Mobil */
  @media (min-width: 0px) and (max-width: 767px) {
    min-width: 200px;
    max-width: 300px;
  }

  /* Liten Dator - */
  @media (min-width: 992px) {
  }

  /* Stor Dator - */
  @media (min-width: 1200px) {
  }
`;

const Green = styled.div`
background-color: var(--main-color);


  input {
    background-color: var(--main-color);
    border: none;
    border-bottom: 1px solid black;

      margin: 15px;
    padding: 5px;
    width: 300px;  

    text-align: center;
     text-transform: uppercase; 


    ::placeholder {
      color: black;
      opacity: 1;
  }
`;

/* const Tune = styled.div`
  border-bottom: 2px solid black;
`; */
/* const Div = styled.div`
  background-color: var(--main-color);

  input {
    background-color: var(--main-color);
    border: none;
    border-bottom: 1px solid black;

    margin: 15px;
    padding: 5px;
    width: 300px;

    /* align-self: center; */
/*   text-align: center; */
/* text-transform: uppercase; */

/* ::placeholder {
      color: black;
      opacity: 1; */
/* font-family: var(--font); Aktuellt först när det finns ett typsnitt*/

/*   @media (min-width: 0px) and (max-width: 767px) {
        max-width: 200px;
        h1 {
          font-size: 2em;
        }
      } */
/*   } */
/*`; */

/* const Container = styled.div` */
/* a {
  color: black;
  text-decoration: none;
}
a:hover {
  /* color taken from the picture on the site */
/*  color: #2a6d38; */
/*}
a:active {
  color: var(--secondary-color);
} */

/* background-color: var(--main-color);
text-align: center; */
/*   margin-top: 20px; */
/* @media (min-width: 0px) and (max-width: 991px) {
  margin-top: auto;
  h1 {
    font-size: 1em;
    padding: 10px;
  } */
/*   h3 {
    margin-top: 0px;
  }
}
@media (min-width: 992px) {
  padding: 30px;
  margin-top: 50px; */
/* }
`; */
