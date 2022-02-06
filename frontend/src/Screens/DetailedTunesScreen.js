import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Footer } from '../components/Footer';
import { DetailTune } from '../components/DetailTune';
import { Header } from '../components/Header';

export const DetailedTunesScreen = () => {
  const { tune } = useParams();
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
      <DetailTune tune={tune} />
      <Footer />
    </>
  );
};
