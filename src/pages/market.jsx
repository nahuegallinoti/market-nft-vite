import React from 'react';
import MarketNFT from '../components/MarketNFT';
import { Text, Center } from '@chakra-ui/react';

const MarketPage = () => {
  return (
    <>
      <Text d={'flex'} justifyContent={'center'} mb={'5'} fontSize='5xl'>
        Market
      </Text>
      <Center>
        <MarketNFT />
      </Center>
    </>
  );
};

export default MarketPage;
