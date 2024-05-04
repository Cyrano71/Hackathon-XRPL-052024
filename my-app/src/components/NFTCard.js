//src/components/NFTCard.js
import React from 'react';
import { convertHexToString }  from "xrpl" 

//component that takes an nft object and maps it to corresponding elements
const NFTCard = ({nft}) => {
    console.log(nft)
    const txn = nft.transactions[0].tx;
    const uri = convertHexToString(txn.URI)
    console.log("uri",uri)
    const data = JSON.parse(convertHexToString(txn.Memos[0].Memo.MemoData))
    console.log(data)
    return (
        <div className='max-w-196 rounded overflow-hidden shadow-lg'>
             <img src={uri} alt="" className='w-full' />
            <div className='px-4 py-4'>
                 <a href={uri}>
                <div className='font-bold text-teal-600 text-xl mb-2'>{data.name}</div>
                </a>  
                <ul>
                    <li>Collection Name: <strong>{data.collectionName}</strong></li>
                </ul>
            </div>
            <div className='px-6 py-4'>
               
                {data.txIds?.map((txId, index) => (
                    <a href={"https://testnet.xrpl.org/transactions/" + txId}>
                        <span key={index} className="inline-block bg-gray-200
                        rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2">{txId}
                        </span>
                </a>
                ))}
           
            </div>
        </div>
    )
}

export default NFTCard;