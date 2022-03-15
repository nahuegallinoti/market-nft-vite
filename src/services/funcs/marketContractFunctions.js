import GetContractInstance from '../ContractFactory';
import {
    MARKETPLACE_CONTRACT_ADDRESS
} from './contractsInfo';
import marketABI from '../../components/_Shared/contracts/MarketNFT.json';
export const GetListingsByOwnerCount = async account => {
    const marketContract = GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI);
    const listingsCount = await marketContract.getListingsByOwnerCount(account);

    return listingsCount;
};


/* 
@parameter: account: del owner, i: listing index
@return listingId: id del token listado
*/
export const GetListingsByOwner = async (account, i) => {
    const marketContract = GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI);
    const listingId = await marketContract.getListingsByOwner(account, i);

    return listingId;
};


/* 
@parameter: nftId
@return address: owner, bool: is_active, uint256: token_id, uint256: price 1000000000000000000
*/
export const GetNFTByListIndex = async nftId => {
    const marketContract = GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI);
    const nft = await marketContract.listings(nftId);

    return nft;

}