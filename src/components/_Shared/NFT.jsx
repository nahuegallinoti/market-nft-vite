import React from 'react';
import { Text, StackDivider, Image, VStack } from '@chakra-ui/react';

const NFT = props => {
  const { nft } = props;

  return (
    <VStack
      divider={<StackDivider borderColor='gray.300' />}
      spacing={2}
      align='stretch'>
      {nft.token_id ? (
        <Text fontSize='xl'>Token Id: {nft.token_id}</Text>
      ) : null}
      {nft.name ? <Text fontSize='xl'>Name: {nft.name}</Text> : null}
      {nft.description ? (
        <Text fontSize='xl'>Description: {nft.description}</Text>
      ) : null}
      {nft.price ? <Text fontSize='xl'>Price: {nft.price}</Text> : null}
      {nft.list_id ? <Text fontSize='xl'>List Id: {nft.list_id}</Text> : null}
      <Image
        src={nft.image}
        width={300}
        height={250}
        border={'5px solid black'}
        padding={'2px'}
        mt={2}
        mb={20}
      />
    </VStack>
  );
};

export default NFT;
