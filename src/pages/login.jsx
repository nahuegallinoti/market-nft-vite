import React from 'react';
import Login from '../components/Login';
import { Text, Center } from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <>
      <Text d={'flex'} justifyContent={'center'} mb={'5'} fontSize='5xl'>
        Account
      </Text>
      <Center>
        <Login />
      </Center>
    </>
  );
};

export default LoginPage;
