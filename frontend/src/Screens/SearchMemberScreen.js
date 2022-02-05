import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SearchMembers } from '../components/SearchMembers';

export const SearchMemberScreen = () => {
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
      <SearchMembers />
      <Footer />
    </>
  );
};
