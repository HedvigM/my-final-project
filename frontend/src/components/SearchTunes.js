import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { member } from '../reducers/member';
import { BtnTunes } from './styledComponents/Buttons';

import styled from 'styled-components';
import {
  POPULAR_URL,
  KNOW_TUNE_URL,
  LEARN_TUNE_URL,
  SEARCH_TUNE
} from '../utils/url';
// import { Link } from 'react-router-dom';
import { LoadingLottie } from './Lottie/LoadingLottie';
import {
  Green,
  LinkStyle,
  InnerComponentContainer,
  R,
  Right
} from './styledComponents/Layout';

export const SearchTunes = () => {
  const [popularList, setPopularList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [value, setValue] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const memberId = useSelector((store) => store.member.memberId);
  const learnTunes = useSelector((store) => store.member.learnTunes);
  const knowTunes = useSelector((store) => store.member.knowTunes);

  const dispatch = useDispatch();

  const onSearchHandle = async () => {
    setLoading(true);
    fetch(SEARCH_TUNE(value))
      .then((res) => res.json())
      .then((data) => {
        setSearchList(data.tunes);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(POPULAR_URL(pageCount))
      .then((res) => res.json())
      .then((data) => {
        setPopularList(data.tunes);
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
  };

  const addKnowTune = async (tuneId) => {
    fetch(KNOW_TUNE_URL(memberId, tuneId), options)
      .then((res) => res.json())
      .then((data) =>
        dispatch(
          member.actions.setKnowTunes([...new Set(data.response.knowTunes)])
        )
      );
  };

  const addLearnTune = async (tuneId) => {
    fetch(LEARN_TUNE_URL(memberId, tuneId), options)
      .then((res) => res.json())
      .then((data) =>
        dispatch(
          member.actions.setLearnTunes([...new Set(data.response.learnTunes)])
        )
      );
  };

  const tunes = (popularList) =>
    popularList.map((item, index) => (
      <InnerComponentContainer key={index}>
        <Tunes>
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
              <BtnTunes onClick={() => addKnowTune(item.id)}>Know</BtnTunes>
            )}

            {learnTunes.includes(item.id) ? (
              <R>
                <p>📚</p>
              </R>
            ) : (
              <R>
                <BtnTunes onClick={() => addLearnTune(item.id)}>Learn</BtnTunes>
              </R>
            )}
          </Right>
        </Tunes>
      </InnerComponentContainer>
    ));

  if (loading) {
    return <LoadingLottie />;
  }

  return (
    <div>
      <Green>
        <InnerComponentContainer>
          <input
            className="input"
            type="text"
            value={value}
            placeholder="Type in a tune 👇"
            onChange={(event) => setValue(event.target.value)}
          />
          <BtnTunes className="accent" onClick={onSearchHandle}>
            Search!
          </BtnTunes>
        </InnerComponentContainer>
      </Green>

      {value ? tunes(searchList) : tunes(popularList)}
      <InnerComponentContainer>
        <Pagination>
          <BtnTunes className="accent" onClick={previousPage}>
            Previous
          </BtnTunes>
          {pageCount}
          <BtnTunes className="accent" onClick={nextPage}>
            Next
          </BtnTunes>
        </Pagination>
      </InnerComponentContainer>
    </div>
  );
};

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
