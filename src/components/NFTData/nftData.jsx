import React, { useContext, useEffect } from 'react';
import { NFTContext } from '../Context/NFTContext';
import { AccountContext } from '../Context/AccountContext';

import NFT from '../_Shared/NFT';

import {
  MARKETPLACE_CONTRACT_ADDRESS,
  LUNGO_NFT_CONTRACT_ADDRESS,
} from '../../services/funcs/contractsInfo';
import marketABI from '../_Shared/contracts/MarketNFT.json';
import nftABI from '../_Shared/contracts/LungoNFT.json';

import GetContractInstance from '../../services/ContractFactory';
import { GetNFTSByAddress } from '../../services/funcs/nftContractFunctions';
import { showNotification } from '../../services/funcs/funcs';
import { CircularProgress, Button, Wrap, WrapItem } from '@chakra-ui/react';

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

      // nfts.pop(x => x.token_id === tokenId);
    } else {
      showNotification('error', `You must approve this token before listing`);
    }
  };

  return nftsLoaded ? (
    <Wrap pt={10} pl={50}>
      {nfts.map((nft, index) => (
        <>
          <WrapItem key={index}>
            <NFT nft={nft} />
          </WrapItem>
          <WrapItem>
            <Button m={3} onClick={async () => await approveSell(nft)}>
              Approve Sell
            </Button>
            <Button m={3} onClick={async () => await sell(nft)}>
              Sell
            </Button>
          </WrapItem>
        </>
      ))}
    </Wrap>
  ) : (
    <CircularProgress isIndeterminate color='green.300' />
  );
};

export default NFTData;
