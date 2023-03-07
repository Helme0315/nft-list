import React, { useEffect, useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CollectionSearch from './components/CollectionSearch';
import NFTCard from "./components/NFTCard";
import { Network, Alchemy, Nft } from "alchemy-sdk";
import NFTModal from './components/NFTModal';
import { isAddress } from "ethers";
import {toast} from 'react-toastify';
import { ErrorAlert } from './components/ErrorAlert';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [nfts, setNFTs] = useState<Nft[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nftOwner, setNftOwner] = useState<string[]>([]);
  const [selectedNft, setSelectedNft] = useState<Nft>();

  const searchCollection = (value: string) => {
    setAddress(value);
    if(isAddress(value)) {
      setIsLoading(false);
      getNFTsFromAddress();
    } else if(value != '') {
      toast.error("Invalid Collection Address")
    }
  }

  const getNFTsFromAddress = async () => {
    try {
      const nftList = await alchemy.nft.getNftsForContract(address)
      if(nftList) {
        setNFTs(nftList?.nfts);
      }
    } catch (e) {
      setNFTs([]);
      toast.error(e as string);
    }
  }

  const clickCard = async (nft: Nft) => {
    try {
      setSelectedNft(nft);
      const metadata = await alchemy.nft.getOwnersForNft(
        nft.contract.address,
        nft.tokenId
      );
      setNftOwner(metadata.owners)
      setShowModal(true);
    } catch(e) {
      toast.error(e as string);
    } 
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="App App-header">
      <ErrorAlert />
      <CollectionSearch searchNFT={(value: string) => searchCollection(value)} />
      {
        !isLoading && nfts.length === 0 ?
        <h1 className='text-5xl text-center mx-auto mt-32'>
          No Collection Found
        </h1>
        :
        null
      }
      <div className='grid grid-cols-4 gap-4 mx-4'>
        {
          nfts.map((token: Nft) => 
            <NFTCard key={token?.tokenId} nft={token} onClickCard={() => clickCard(token)}  />
          )
        }
      </div>
      {
        showModal ?
        <NFTModal key={selectedNft?.tokenId} nft={selectedNft} owners={nftOwner} onCloseModal={() => closeModal()}/>
        : 
        null
      }
    </div>
  );
}

export default App;
