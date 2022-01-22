import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchMembers } from '../components/SearchMembers';

export const SearchMemberScreen = () => {
  return (
    <>
      <Header />
      <SearchMembers />
      <Footer />
    </>
  );
};
