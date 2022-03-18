import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Context/AccountContext';

import NFT from '../_Shared/NFT';

import {
  LUNGO_TOKEN_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
  LUNGO_NFT_CONTRACT_ADDRESS,
} from '../../services/funcs/contractsInfo';
import lungoTokenABI from '../_Shared/contracts/LungoToken.json';
import marketABI from '../_Shared/contracts/MarketNFT.json';
import nftABI from '../_Shared/contracts/LungoNFT.json';

import { formatEther, showNotification } from '../../services/funcs/funcs';
import { GetNFTImageById } from '../../services/funcs/nftContractFunctions';
import GetContractInstance from '../../services/ContractFactory';

import './Market.css';
import { CircularProgress, Button } from '@chakra-ui/react';

const MarketNFT = () => {
  const { account } = useContext(AccountContext);

  const [marketContract, setMarketContract] = useState(null);
  const [lungoTokenContract, setLungoTokenContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);

  const [nftsLoaded, setNftsLoaded] = useState(false);
  const [nftsLoading, setNftsLoading] = useState(false);

  const [activeListingCount, setActiveListingCount] = useState(-1);
  const [nftListed, setNFTListed] = useState([]);

  useEffect(() => {
    setMarketContract(
      GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI)
    );
    setLungoTokenContract(
      GetContractInstance(LUNGO_TOKEN_CONTRACT_ADDRESS, lungoTokenABI)
    );
    setNFTContract(GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI));
  }, [nftListed]);

  const approveBuy = async nft => {
    let priceFixed = nft.price.toString() + '000000000000000000';
    priceFixed = priceFixed.replace('.', '');
    await lungoTokenContract
      .approve(marketContract?.address, priceFixed)
      .then(result => {
        showNotification('information', 'Buy approve in progress..');
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

  const buy = async nft => {
    let allowance = await lungoTokenContract.allowance(
      account,
      marketContract?.address
    );

    allowance = allowance.toString();

    let listId = nft.list_id.toString();
    let priceFixed = nft.price.toString() + '000000000000000000';
    priceFixed = priceFixed.replace('.', '');

    if (allowance >= priceFixed) {
      buyNft(listId)
        .then(result => {
          showNotification('information', 'Buy in progress..');
          showNotification(
            'information',
            'TX Hash: ' + result.hash,
            'bottom',
            5000
          );

          listId = parseInt(listId);
          setNFTListed(nftListed.filter(nft => nft.list_id !== listId));
          setActiveListingCount(activeListingCount - 1);
        })
        .catch(err => {
          showNotification('error', `Buy failed ${err.message}`);
        });
    } else {
      showNotification('error', `Buy failed. Allowance is not enough`);
    }
  };

  const buyNft = async listId => {
    try {
      const resultado = await marketContract.buy(listId);
      return resultado;
    } catch (err) {
      showNotification('error', `Buy failed ${err.message}`);
    }
  };

  const showMarket = async () => {
    const nfts = [];

    await marketContract.getActiveListingsCount().then(count => {
      setNftsLoading(true);
      setNFTListed([]);
      count = count.toNumber();
      setActiveListingCount(count);

      if (count === 0) {
        setNftsLoaded(true);
        setNftsLoading(false);
      }
      for (let i = 0; i < count; i++) {
        marketContract.getActiveListings(i).then(listingId => {
          listingId = listingId.toNumber();
          marketContract.listings(listingId).then(listing => {
            GetNFTImageById(listing.token_id.toNumber())
              .then(async image => {
                const uri = await nftContract.tokenURI(listing.token_id);
                const result = await fetch(uri);
                const jsonResult = await result.json();

                const nft = {
                  token_id: listing.token_id.toNumber(),
                  price: formatEther(listing.price),
                  list_id: listingId,
                  image: image,
                  name: jsonResult.name,
                  description: jsonResult.description,
                };
                nfts.push(nft);
              })
              .then(() => {
                if (nfts.length === count) {
                  const nfts2 = nfts.sort((a, b) => {
                    return a.token_id - b.token_id;
                  });
                  setNFTListed(nfts2);
                  setNftsLoaded(true);
                  setNftsLoading(false);
                }
              });
          });
        });
      }
    });
  };

  return nftsLoaded ? (
    nftListed.map((nft, index) => (
      <>
        <NFT nft={nft} key={index} />
        <Button
          className='nft-button'
          onClick={async () => await approveBuy(nft)}>
          Approve Buy
        </Button>
        <Button
          type='primary'
          className='nft-button'
          onClick={async () => await buy(nft)}>
          Buy
        </Button>
      </>
    ))
  ) : !nftsLoading ? (
    <Button onClick={async () => showMarket()}>Show Market</Button>
  ) : (
    <CircularProgress isIndeterminate color='green.300' />
  );
};

export default MarketNFT;
