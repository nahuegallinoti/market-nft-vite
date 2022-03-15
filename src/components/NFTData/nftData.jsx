import React, { useContext, useEffect } from 'react';
import { NFTContext } from '../Context/NFTContext';
import { AccountContext } from '../Context/AccountContext';

import NFT from '../_Shared/NFT';

import { Button } from 'antd';
import { MainTitle } from '../Navbar/NavbarElements';
import { DivCenter } from '../_Shared/styles/GlobalElements';

import {
  MARKETPLACE_CONTRACT_ADDRESS,
  LUNGO_NFT_CONTRACT_ADDRESS,
} from '../../services/funcs/contractsInfo';
import marketABI from '../_Shared/contracts/MarketNFT.json';
import nftABI from '../_Shared/contracts/LungoNFT.json';

import GetContractInstance from '../../services/ContractFactory';
import { GetNFTSByAddress } from '../../services/funcs/nftContractFunctions';
import { showNotification } from '../../services/funcs/funcs';

const NFTData = () => {
  const { account } = useContext(AccountContext);
  const { nfts, setNFTS } = useContext(NFTContext);
  const [nftsLoaded, setNftsLoaded] = React.useState(false);
  const [nftContract, setNFTContract] = React.useState(null);
  const [marketContract, setMarketContract] = React.useState(null);

  useEffect(() => {
    setMarketContract(
      GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI)
    );
    setNFTContract(GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI));

    GetNFTSByAddress(account).then(nft => {
      setNFTS(nft);
      setNftsLoaded(true);
    });
  }, [account]);

  const approveSell = async nft => {
    const tokenId = Number(nft.token_id).toString();

    await nftContract
      .approve(marketContract.address, tokenId)
      .then(result => {
        showNotification('information', 'Sell approve in progress..');
        showNotification(
          'information',
          'TX Hash: ' + result.hash,
          'bottom',
          5000
        );
      })
      .catch(err => {
        showNotification('error', `Buy approve failed ${err.data.message}`);
      });
  };

  const sell = async nft => {
    const tokenId = Number(nft.token_id);

    // const price = Number(nft.price).toString() + '000000000000000000'; // TODO

    const price = '1000000000000000000'; // TODO
    const isApproved = await nftContract.getApproved(tokenId);

    if (isApproved === marketContract.address) {
      await marketContract
        .addListing(tokenId, price)
        .then(result => {
          showNotification('information', `List in progress..`);
          showNotification(
            'information',
            'TX Hash: ' + result.hash,
            'bottom',
            5000
          );
        })
        .catch(err => {
          showNotification('error', `Buy approve failed ${err.data.message}`);
        });
    } else {
      showNotification('error', `You must approve this token before listing`);
    }
  };

  return nftsLoaded ? (
    nfts.map((nft, index) => (
      <>
        <DivCenter key={index}>
          <NFT nft={nft} />
        </DivCenter>
        <Button
          className='nft-button'
          onClick={async () => await approveSell(nft)}>
          Approve Sell
        </Button>
        <Button
          type='primary'
          className='nft-button'
          onClick={async () => await sell(nft)}>
          Sell
        </Button>
      </>
    ))
  ) : (
    <MainTitle colorTitle='white'>Loading...</MainTitle>
  );
};

export default NFTData;
