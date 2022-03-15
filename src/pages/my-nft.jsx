import React from 'react';
import Header from '../components/Header';
import NFTData from '../components/NFTData/nftData';
import { DivCenter } from '../components/_Shared/styles/GlobalElements';

const MyNFTPage = () => {
  return (
    <>
      <Header name='My NFTs' colorTitle='white' />
      <DivCenter>
        <NFTData />
      </DivCenter>
    </>
  );
};

export default MyNFTPage;
