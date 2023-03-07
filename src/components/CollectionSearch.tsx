import React, { useState } from 'react';
import { SearchProps } from '../constants/variableTypes';

export default function CollectionSearch({searchNFT}: SearchProps) {
    const [collectionAddress, setCollectionAddress] = useState('');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        searchNFT(collectionAddress);
    }

    return (
        <div className='w-6/12 rounded overflow-hidden my-10 mx-auto'>
            <form onSubmit={handleSubmit} className="w-full max-w">
                <div className="flex items-center border-b-2 border-purple-500 py-2">
                    <input onChange={e => setCollectionAddress(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search Collection Address" />
                    <button className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}
