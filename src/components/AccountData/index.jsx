import { useEffect, useState } from 'react';

import { MainTitle } from '../Navbar/NavbarElements';
import { DivCenter } from '../_Shared/styles/GlobalElements';

import lungoTokenABI from '../_Shared/contracts/LungoToken.json';
import { LUNGO_TOKEN_CONTRACT_ADDRESS } from '../../services/funcs/contractsInfo';

import GetContractInstance from '../../services/ContractFactory';
import { formatEther } from '../../services/funcs/funcs';

function AccountData(props) {
  const { address } = props;
  const contractToken = GetContractInstance(
    LUNGO_TOKEN_CONTRACT_ADDRESS,
    lungoTokenABI
  );

  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState(null);

  useEffect(() => {
    contractToken.balanceOf(address).then(res => {
      setBalance(formatEther(res));
    });

    contractToken.symbol().then(res => {
      setSymbol(res);
    });
  }, [address]);

  return (
    <div>
      <MainTitle colorTitle='white'>Wallet Connected: {address}</MainTitle>
      <DivCenter>
        <MainTitle colorTitle='white'>
          Wallet Balance: {balance + ' ' + symbol}
        </MainTitle>
      </DivCenter>
    </div>
  );
}

export default AccountData;
