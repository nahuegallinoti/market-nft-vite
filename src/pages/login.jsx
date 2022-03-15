import React from 'react';
import Login from '../components/Login';
import Header from '../components/Header';
import { DivCenter } from '../components/_Shared/styles/GlobalElements';

const LoginPage = () => {
  return (
    <>
      <Header name='Account' colorTitle='white' />
      <DivCenter>
        <Login />
      </DivCenter>
    </>
  );
};

export default LoginPage;
