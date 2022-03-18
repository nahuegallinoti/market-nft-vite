import React, { useState } from 'react';
import { CircularProgress, Image, Button } from '@chakra-ui/react';

import { LUNGO_NFT_CONTRACT_ADDRESS } from '../../services/funcs/contractsInfo';
import lungoNftABI from '../_Shared/contracts/LungoNFT.json';

import GetContractInstance from '../../services/ContractFactory';
import { showNotification } from '../../services/funcs/funcs';

const MintNFT = () => {
  const [isMinting, setIsMinting] = useState(false);

  const mintNftHandler = async () => {
    try {
      setIsMinting(true);
      const nftContract = GetContractInstance(
        LUNGO_NFT_CONTRACT_ADDRESS,
        lungoNftABI
      );

      const nftTxn = await nftContract.mint();

      await nftTxn.wait();

      showNotification('information', 'NFT minted successfully!');
      showNotification(
        'information',
        'TX Hash: ' + nftTxn.hash,
        'bottom',
        5000
      );
      setIsMinting(false);
    } catch (err) {
      setIsMinting(false);
      showNotification('error', 'Mint canceled by user', 'topRight', 3000);
      console.log(err);
    }
  };

  return !isMinting ? (
    <>
      <Image
        src={'/images/nfts.gif'}
        width={300}
        height={300}
        alt='nft-gif'
        border={'5px solid black'}
      />
      <Button onClick={mintNftHandler}>Mint NFT</Button>
    </>
  ) : (
    <CircularProgress isIndeterminate color='green.300' />
  );
};

export default MintNFT;
