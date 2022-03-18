import { Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import AccountData from '../AccountData';
import { AccountContext } from '../Context/AccountContext';

const Login = () => {
  const { account } = useContext(AccountContext);

  return account ? (
    <AccountData address={account}></AccountData>
  ) : (
    <Text fontSize='4xl'>Please connect to Metamask</Text>
  );
};

export default Login;
