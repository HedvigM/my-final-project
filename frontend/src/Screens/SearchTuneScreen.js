import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchTunes } from '../components/SearchTunes';

export const SearchTuneScreen = () => {
  return (
    <>
      <Header />
      <SearchTunes />
      <Footer />
    </>
  );
};
