import React from 'react';
import Listings from '../components/Listings';
import { Text, Center } from '@chakra-ui/react';

const ListingsPage = () => {
  return (
    <>
      <Text d={'flex'} justifyContent={'center'} mb={'5'} fontSize='5xl'>
        My Listings
      </Text>
      <Center>
        <Listings />
      </Center>
    </>
  );
};

export default ListingsPage;
