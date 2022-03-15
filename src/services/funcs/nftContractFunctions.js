import GetContractInstance from '../ContractFactory';
import {
  LUNGO_NFT_CONTRACT_ADDRESS
} from './contractsInfo';
import nftABI from '../../components/_Shared/contracts/LungoNFT.json';

export const GetNFTImageById = async tokenId => {
  const NFTContract = GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI);

  const uri = await NFTContract.tokenURI(tokenId);
  const result = await fetch(uri);
  const jsonResult = await result.json();

  return jsonResult.image;
};

export const GetNFTSByAddress = async address => {
  const NFTContract = GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI);

  let balance = await NFTContract.balanceOf(address);
  balance = balance.toNumber();

  const tokens = [];

  for (let index = 0; index <= balance - 1; index++) {
    let tokenId = await NFTContract.tokenOfOwnerByIndex(address, index);
    tokenId = tokenId.toNumber();

    const uri = await NFTContract.tokenURI(tokenId);

    const result = await fetch(uri);
    const jsonResult = await result.json();
    jsonResult.token_id = tokenId;

    tokens.push(jsonResult);
  }

  return tokens;
};