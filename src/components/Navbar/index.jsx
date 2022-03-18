import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Context/AccountContext';
import { ConnectWalletHandler } from '../../services/funcs/funcs';
import {
  Nav,
  NavLogo,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

import { useColorMode, Text, Button, Box } from '@chakra-ui/react';

const Navbar = () => {
  const { ethereum } = window;

  const [refresh, setRefresh] = useState(false);
  const { account, setAccount } = useContext(AccountContext);

  const { toggleColorMode } = useColorMode();

  ethereum.on('accountsChanged', () => {
    setAccount(ethereum.selectedAddress);
    localStorage.setItem('addressAccount', ethereum.selectedAddress);
  });

  useEffect(() => {
    account ? setAccount(account) : handleConnection();
  }, [refresh]);

  const handleConnection = async () => {
    setRefresh(true);
    const acc = await ConnectWalletHandler(account);
    setAccount(acc);
  };

  return (
    <>
      <Nav>
        <NavLogo to='/login'>Lungo</NavLogo>

        <NavMenu>
          <NavLink to='/mint' activestyle={{ color: 'black' }}>
            Mint NFT
          </NavLink>
          <NavLink to='/market' activestyle={{ color: 'black' }}>
            Market
          </NavLink>
          <NavLink to='/my-nft' activestyle={{ color: 'black' }}>
            My NFTs
          </NavLink>
          <NavLink to='/listings' activestyle={{ color: 'black' }}>
            My Listings
          </NavLink>
          <NavLink to='/staking' activestyle={{ color: 'black' }}>
            Staking
          </NavLink>
          <NavBtn>
            <NavBtnLink onClick={() => handleConnection()} to='/login'>
              {account ? 'Logout' : 'Connect Account'}
            </NavBtnLink>
          </NavBtn>
          <Button _focus={'outline: none'} onClick={toggleColorMode}>
            🌙
          </Button>
          <Box>
            <Text fontSize='1xl' color={'white'} ml={30}>
              {account}
            </Text>
          </Box>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
