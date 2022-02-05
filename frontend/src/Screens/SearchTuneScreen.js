import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchTunes } from '../components/SearchTunes';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SearchTuneScreen = () => {
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.member.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <>
      <Header />
      <SearchTunes />
      <Footer />
    </>
  );
};
