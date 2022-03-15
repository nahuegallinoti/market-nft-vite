import React from 'react';
import Header from '../components/Header';
import MintNFT from '../components/MintNFT';
import { DivCenter } from '../components/_Shared/styles/GlobalElements';

const MintNFTPage = () => {
  return (
    <>
      <Header name='Mint NFT' colorTitle='white' />
      <DivCenter>
        <MintNFT />
      </DivCenter>
    </>
  );
};

export default MintNFTPage;
