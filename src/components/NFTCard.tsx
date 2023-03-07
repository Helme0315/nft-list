import { NFTCardProps } from '../constants/variableTypes';

export default function NFTCard({nft, onClickCard}: NFTCardProps) {

    return (
        <div className='max-w-[300px] rounded overflow-hidden shadow-lg cursor-pointer' onClick={() => onClickCard()}>
            <img src={nft.media[0].thumbnail} alt="" className='w-full' />
            <div className='px-4 py-4'>
                <div className='font-bold text-teal-600 text-xl mb-2'>
                    {
                        nft.rawMetadata.name ? 
                        nft.rawMetadata.name
                        :
                        nft.contract.name
                    }
                </div>
            </div>
            <div className='px-2 py-4'>
                {
                    nft.rawMetadata.attributes?.map((trait: any, index: number) => 
                    (
                        <span key={index} className="inline-block bg-gray-200
                        rounded-full px-3 py-2 text-sm font-semibold text-gray-700 m-1">{trait['trait_type']}:{trait.value}
                        </span>
                    ))
                }
                <div>
                </div>
            </div>
        </div>
    )
}