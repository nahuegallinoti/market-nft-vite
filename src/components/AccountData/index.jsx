import { useEffect, useState } from 'react';

import lungoTokenABI from '../_Shared/contracts/LungoToken.json';
import { LUNGO_TOKEN_CONTRACT_ADDRESS } from '../../services/funcs/contractsInfo';

import GetContractInstance from '../../services/ContractFactory';
import { formatEther } from '../../services/funcs/funcs';
import { Text } from '@chakra-ui/react';

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
      <Text fontSize='4xl'>Wallet Connected: {address}</Text>
      <Text fontSize='4xl'>Wallet Balance: {balance + ' ' + symbol}</Text>
    </div>
  );
}

export default AccountData;
