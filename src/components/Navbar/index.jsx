import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Context/AccountContext';
import { ConnectWalletHandler } from '../../services/funcs/funcs';
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  TitleAccount,
} from './NavbarElements';

const Navbar = () => {
  const { ethereum } = window;

  const [refresh, setRefresh] = useState(false);
  const { account, setAccount } = useContext(AccountContext);

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
      <Nav className={'navLogo'}>
        <NavLogo className={'navLogo'} to='/login'>
          Lungo
        </NavLogo>
        <Bars />

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
            <TitleAccount>{account}</TitleAccount>
            <NavBtnLink onClick={() => handleConnection()} to='/login'>
              <span>{account ? 'Logout' : 'Connect Account'}</span>
            </NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
