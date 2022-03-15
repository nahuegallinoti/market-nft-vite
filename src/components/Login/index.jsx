import React, { useContext } from 'react';
import AccountData from '../AccountData';
import { AccountContext } from '../Context/AccountContext';
import { MainTitle } from '../Navbar/NavbarElements';

const Login = () => {
  const { account } = useContext(AccountContext);

  return account ? (
    <AccountData address={account}></AccountData>
  ) : (
    <MainTitle colorTitle='white'>Please connect to Metamask</MainTitle>
  );
};

export default Login;
