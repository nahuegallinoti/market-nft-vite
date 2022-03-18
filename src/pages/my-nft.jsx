import React from 'react';
import NFTData from '../components/NFTData/nftData';
import { Text, Center } from '@chakra-ui/react';

const MyNFTPage = () => {
  return (
    <>
      <Text d={'flex'} justifyContent={'center'} mb={'5'} fontSize='5xl'>
        My NFTs
      </Text>
      <Center>
        <NFTData />
      </Center>
    </>
  );
};

export default MyNFTPage;
