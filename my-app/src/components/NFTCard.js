//src/components/NFTCard.js
import React, { useState } from 'react';
import { convertHexToString }  from "xrpl" 
import image01 from'../images/01.PNG';
import image02 from'../images/02.PNG';
import image03 from'../images/03.png';

//component that takes an nft object and maps it to corresponding elements
const NFTCard = ({nft}) => {
    console.log(nft)
    const txn = nft.transactions[0].tx;
    const hash = txn.hash;
    const explorer = "https://testnet.xrpl.org/transactions/" + hash
    const uri = convertHexToString(txn.URI)
    console.log("uri",uri)
    const data = JSON.parse(convertHexToString(txn.Memos[0].Memo.MemoData))
    console.log(data)
    let source = image03
    if (data.collectionName === "75006") {
        source = image01;
    } else if (data.collectionName === "75007") {
        source = image02;
    } 
    return (
        <div className='max-w-196 rounded overflow-hidden shadow-lg'>


<h1 class="flex items-center text-lg font-extrabold dark:text-white text-center my-5 mx-20"><span class="bg-blue-100 text-blue-800 text-lg font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2"> <a href={explorer}>
{ "NFT_ID    " + nft.nft_id.substring(0, 20) + "....."}
         </a> </span></h1>

             <img src={source} alt="" className='w-full object-contain h-48 w-96'/>
            <div className='px-4 py-4'>
                 <a href={uri}>
                <div className='font-bold text-teal-600 text-xl mb-2'>{data.name}</div>
                </a>  
                <ul>
                   
                </ul>
            </div>
            <div className='px-6 py-4'>
            <h1 class="mb-4 text-lg font-extrabold text-gray-900 dark:text-white md:text-lg lg:text-lg">
            <h1 class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Transactions Ids</h1>
                </h1>
                {data.txIds?.map((txId, index) => (
                    <a href={"https://testnet.xrpl.org/transactions/" + txId}>
                        <span key={index} className="inline-block bg-gray-200
                        rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2">{txId.substring(0, 20) + "....."}
                        </span>
                </a>
                ))}
           
            </div>
        </div>
    )
}

export default NFTCard;