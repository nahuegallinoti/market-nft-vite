import React from 'react';
import { ListItem, ListContainer, Image } from './styles/GlobalElements';

const NFT = props => {
  const { nft } = props;

  return (
    <>
      <ListContainer>
        {nft.token_id ? <ListItem>Token Id: {nft.token_id}</ListItem> : null}
        {nft.name ? <ListItem>Name: {nft.name}</ListItem> : null}
        {nft.description ? (
          <ListItem>Description: {nft.description}</ListItem>
        ) : null}
        {nft.price ? <ListItem>Price: {nft.price}</ListItem> : null}
        {nft.list_id ? <ListItem>List Id: {nft.list_id}</ListItem> : null}
        <Image src={nft.image} width={300} height={250} />
      </ListContainer>
    </>
  );
};

export default NFT;
