import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Footer } from '../components/Footer';
import { DetailTune } from '../components/DetailTune';
import { Header } from '../components/Header';

export const DetailedTunesScreen = () => {
  const { tune } = useParams();
  return (
    <>
      <Header />
      <DetailTune tune={tune} />
      <Footer />
    </>
  );
};
