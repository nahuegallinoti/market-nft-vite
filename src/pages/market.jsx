import React from 'react';
import Header from '../components/Header';
import MarketNFT from '../components/MarketNFT';
import { DivCenter } from '../components/_Shared/styles/GlobalElements';

const MarketPage = () => {
  return (
    <>
      <Header name='Market' colorTitle='white' />
      <DivCenter>
        <MarketNFT />
      </DivCenter>
    </>
  );
};

export default MarketPage;
