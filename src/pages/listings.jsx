import React from 'react';
import Header from '../components/Header';
import { DivCenter } from '../components/_Shared/styles/GlobalElements';
import Listings from '../components/Listings';

const ListingsPage = () => {
  return (
    <>
      <Header name='My Listings' colorTitle='white' />
      <DivCenter>
        <Listings />
      </DivCenter>
    </>
  );
};

export default ListingsPage;
