import React, { useContext, useEffect } from 'react';
import {
  STAKING_NFT_CONTRACT_ADDRESS,
  LUNGO_NFT_CONTRACT_ADDRESS,
} from '../../services/funcs/contractsInfo';
import { AccountContext } from '../Context/AccountContext';
import GetContractInstance from '../../services/ContractFactory';
import stakingABI from '../_Shared/contracts/StakingNFT.json';
import nftABI from '../_Shared/contracts/LungoNFT.json';
import { showNotification } from '../../services/funcs/funcs';
import { GetNFTImageById } from '../../services/funcs/nftContractFunctions';
import { Button, Text, Box, Image } from '@chakra-ui/react';

const staking = () => {
  const { account } = useContext(AccountContext);

  const [stakingContract, setStakingContract] = React.useState(null);
  const [nftContract, setNFTContract] = React.useState(null);

  let nftStaked = [];
  const [currentReward, setCurrentReward] = React.useState(0);
  const [activeStakingCountNumber, setStakingCountNumber] = React.useState(-1);

  useEffect(() => {
    setStakingContract(
      GetContractInstance(STAKING_NFT_CONTRACT_ADDRESS, stakingABI)
    );
    setNFTContract(GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI));
  }, [account]);

  const showStake = async () => {
    if (nftStaked.length !== 0 || activeStakingCountNumber !== -1) {
      setStakingCountNumber(-1);
      nftStaked = [];
      return;
    }

    stakingContract.has_deposited(account).then(hasDeposit => {
      if (!hasDeposit) {
        setStakingCountNumber(0);
        return;
      }

      stakingContract.deposited_tokens(account).then(nftid => {
        const tokenId = Number(nftid).toString();

        GetNFTImageById(tokenId).then(image => {
          const nft = {
            id: Number(tokenId),
            image: image,
            price: '',
          };

          nftStaked.push(nft);

          console.table(nftStaked);
          setStakingCountNumber(nftStaked.length);
        });
      });

      stakingContract.calculateReward(account).then(reward => {
        const rewardFixed = Number(reward) / 1000000000000000000;
        setCurrentReward(rewardFixed);
      });
    });
  };

  const unstake = async () => {
    await stakingContract
      .withdraw()
      .then(result => {
        showNotification(
          'success',
          'Unstake successfully. Tokens were sent to your wallet'
        );
        showNotification(
          'information',
          'TX Hash: ' + result.hash,
          'bottom',
          5000
        );

        setCurrentReward(0);
        nftStaked.splice(
          // eslint-disable-next-line no-self-compare
          nftStaked.findIndex(x => x === x),
          1
        );

        const actual = activeStakingCountNumber;
        setStakingCountNumber(actual - 1);
      })
      .catch(err => {
        showNotification('error', `Unstake failed ${err.data.message}`);
      });
  };

  return activeStakingCountNumber === -1 ? (
    <>
      <Box>
        <Button onClick={showStake}>Show Stake</Button>
      </Box>
    </>
  ) : (
    <>
      <Box>
        <Text fontSize='xl'>Total Staked: {activeStakingCountNumber}</Text>
        <Image src={nftStaked.image} />
        <Text fontSize='xl'>Current Reward: {currentReward} STT</Text>
        <Button onClick={unstake}>
          <Text fontSize='xl'>Unstake</Text>
        </Button>
      </Box>
    </>
  );
};

export default staking;
