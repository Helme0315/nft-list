import { OPENSEA_URL } from '../constants/constants';
import { NFTModalProps } from '../constants/variableTypes';

export default function NFTModal({nft, owners, onCloseModal}: NFTModalProps) {
    const purchase = () => {
        window.open(OPENSEA_URL+nft.contract.address+"/"+nft.tokenId, '_blank', 'noreferrer');
    }
    const closeModal = () => {
        onCloseModal();
    }

    return (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none"
          >
            <div className='max-w-[600px] rounded overflow-hidden shadow-lg bg-white py-6 px-12' >
                <img src={nft.media[0].thumbnail} alt="" className='max-w-[300px] m-auto' />
                <div className='px-4 py-2'>
                    <div className='font-bold text-teal-600 text-xl mb-2'>
                        Name:&nbsp;
                        {
                            nft.rawMetadata.name ? 
                            nft.rawMetadata.name
                            :
                            nft.contract.name
                        }
                    </div>

                    <div className='font-bold text-teal-600 text-xl mb-2'>
                        Collection:&nbsp;
                        {nft.contract.name}
                    </div>
                    <div className='font-bold text-teal-600 text-xl mb-2'>
                        Symbol:&nbsp;
                        {nft.contract.symbol}
                    </div>
                    <div className='font-bold text-teal-600 text-xl mb-2'>
                        Total Supply:&nbsp;
                        {nft.contract.totalSupply}
                    </div>
                    
                </div>
                <div className='px-2 py-2'>
                    <label className='text-black text-base'>Attributes: </label>
                    {
                        nft.rawMetadata.attributes?.map((trait: any, index: number) => (
                            <span key={index} className="inline-block bg-gray-200
                                rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2">{trait['trait_type']}:{trait.value}
                            </span>
                        ))
                    }
                    <div></div>
                </div>
        
                <div className='px-2 py-2'>
                    {
                        owners?.map((owner: any, index: number) => 
                        (
                            <>
                                <label className='text-black text-base'>Owner: </label>
                                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2">{owner}</span>
                            </>
                        ))
                    }
                    <div>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-2 px-4 rounded" onClick={() => purchase()}>
                    Purchase
                </button>

                <button className="bg-red-500 hover:bg-red-700 text-white text-base font-bold py-2 px-4 rounded ml-3" onClick={() => closeModal()}>
                    Close
                </button>
            </div>
            
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
