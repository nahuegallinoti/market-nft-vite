import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Context/AccountContext';

import NFT from '../_Shared/NFT';

import {
  MARKETPLACE_CONTRACT_ADDRESS,
  LUNGO_NFT_CONTRACT_ADDRESS,
} from '../../services/funcs/contractsInfo';
import marketABI from '../_Shared/contracts/MarketNFT.json';
import nftABI from '../_Shared/contracts/LungoNFT.json';

import './Listings.css';

import { GetNFTImageById } from '../../services/funcs/nftContractFunctions';
import {
  GetListingsByOwnerCount,
  GetListingsByOwner,
  GetNFTByListIndex,
} from '../../services/funcs/marketContractFunctions';
import GetContractInstance from '../../services/ContractFactory';

import { formatEther, showNotification } from '../../services/funcs/funcs';
import { Button } from '@chakra-ui/react';

const Listings = () => {
  const { account } = useContext(AccountContext);

  const [marketContract, setMarketContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);

  const [nftListed, setNftListed] = useState([]);
  const [nftLoaded, setNftLoaded] = useState(false);

  const [activeListingCount, setActiveListingCount] = useState(-1);

  useEffect(() => {
    setMarketContract(
      GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI)
    );
    setNFTContract(GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI));
    showList();
  }, [account]);

  const showList = async () => {
    setNftListed([]);
    const listNft = [];

    await GetListingsByOwnerCount(account).then(count => {
      count = count.toNumber();
      setActiveListingCount(count);

      for (let i = 0; i < count; i++) {
        GetListingsByOwner(account, i).then(nftId => {
          nftId = nftId.toNumber();
          GetNFTByListIndex(nftId).then(listing => {
            let price = Number(listing.price).toString();
            price = price.replace('.', ',');

            GetNFTImageById(listing.token_id.toNumber()).then(async image => {
              const uri = await nftContract.tokenURI(listing.token_id);
              const result = await fetch(uri);
              const jsonResult = await result.json();

              const nft = {
                token_id: listing.token_id.toNumber(),
                price: formatEther(listing.price),
                list_id: nftId,
                image: image,
                name: jsonResult.name,
                description: jsonResult.description,
              };

              listNft.push(nft);

              if (listNft.length === count) {
                setNftListed(listNft);
                setNftLoaded(true);
              }
            });
          });
        });
      }
    });
  };

  const deslist = async _listId => {
    const listId = _listId.toString();

    await marketContract.removeListing(listId).then(result => {
      showNotification('success', 'Listing removed');
      showNotification(
        'information',
        'TX Hash: ' + result.hash,
        'bottom',
        5000
      );
    });
  };

  return nftLoaded ? (
    nftListed.map((nft, index) => (
      <>
        <NFT nft={nft} key={index} />
        <Button
          className='nft-button'
          onClick={async () => await deslist(nft.list_id)}>
          Deslist
        </Button>
      </>
    ))
  ) : (
    <Button onClick={async () => showList()}>Show Listings</Button>
  );
};

export default Listings;
