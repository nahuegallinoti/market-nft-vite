import React from 'react';
import MintNFT from '../components/MintNFT';
import { Text, Center } from '@chakra-ui/react';

const MintNFTPage = () => {
  return (
    <>
      <Text d={'flex'} justifyContent={'center'} mb={'5'} fontSize='5xl'>
        Mint NFT
      </Text>
      <Center>
        <MintNFT />
      </Center>
    </>
  );
};

export default MintNFTPage;
