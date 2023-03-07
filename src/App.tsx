import React, {  useRef, useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CollectionSearch from './components/CollectionSearch';
import NFTCard from "./components/NFTCard";
import { Network, Alchemy, Nft } from "alchemy-sdk";
import NFTModal from './components/NFTModal';
import { isAddress } from "ethers";
import {toast} from 'react-toastify';
import { ErrorAlert } from './components/ErrorAlert';
import Loading from './components/Loading';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [nfts, setNFTs] = useState<Nft[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [nftOwner, setNftOwner] = useState<string[]>([]);
  const [selectedNft, setSelectedNft] = useState<Nft>();
  const [nftPageKey, setNftPageKey] = useState("0");
  const [address, setAddress] = useState("");
  const root = useRef(null);

  const searchCollection = (value: string) => {
    if(isAddress(value)) {
      setAddress(value);
      setNFTs([]);
      setIsLoading(true);
      getNFTsFromAddress(value);
    } else if(value != '') {
      toast.error("Invalid Collection Address")
    }
  }

  const getNFTsFromAddress = async (collection: string) => {
    try {
      const nftList = await alchemy.nft.getNftsForContract(collection, {
        pageKey: nftPageKey
      })
      if(nftList) {
        setNFTs(nfts.concat(nftList?.nfts));
        setNftPageKey((nfts.length + nftList?.nfts.length).toString());
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      let errorMessage = "Unknown Error";
      if(error instanceof Error)
        errorMessage = error.message;
      toast.error(errorMessage);
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
    } catch(error) {
      let errorMessage = "Unknown Error";
      if(error instanceof Error)
        errorMessage = error.message;
      toast.error(errorMessage);
    } 
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const loadMore = () => {
    setIsLoading(true);
    getNFTsFromAddress(address);
  }

  return (
    <div className="App App-header" ref={root}>
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
        isLoading ?
        <div className='mt-4'>
          <Loading />
        </div>
        :
        null
      }
      {
        !isLoading && nfts.length > 0 ?
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-2 px-4 rounded m-4" onClick={() => loadMore()}>
          Load more NFTs
        </button>
        :
        null
      }
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
