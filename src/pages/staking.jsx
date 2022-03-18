import React from 'react';
import { Text, Center } from '@chakra-ui/react';
import Staking from '../components/Staking/staking';

const StakingPage = () => {
  return (
    <>
      <Text d={'flex'} justifyContent={'center'} mb={'5'} fontSize='5xl'>
        Staking
      </Text>
      <Center>
        <Staking />
      </Center>
    </>
  );
};

export default StakingPage;
