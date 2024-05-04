//src/App.js
//Import libraries and components
import { useEffect, useState } from 'react';
import NFTCard from './components/NFTCard';
import CollectionSearch from './components/CollectionSearch';
import {  Client, Wallet }  from "xrpl" 

const clioClient = new Client("wss://clio.altnet.rippletest.net:51233/")
const sClient = new Client("wss://s.altnet.rippletest.net:51233")

function App() {
  //State variables
  const [nfts, setNFTs] = useState([])
  const [address, setAddress] = useState('')

  useEffect(()=>{ 
    async function fetchData() {
      console.log("connection clients")
      }
    fetchData();
}, [])

  //useEffect renders every time address is set
  useEffect(() => {
     //function to fetch nfts by collection
    async function fetchCollection() {
      await clioClient.connect()
      await sClient.connect()

      const standby_wallet = Wallet.fromSeed(address);
      const request_account= {
        command: "account_nfts",
        account: standby_wallet.classicAddress
      };

      const nfts = await sClient.request(request_account)
      const account_nfts = nfts.result.account_nfts
      console.log(nfts);
      const collection = []
      for (let i = 0; i < account_nfts.length; i++) {
          const request = {
              command: "nft_history",
              nft_id: account_nfts[i].NFTokenID
            };   
          console.log("fetching data", request)
          const result = await clioClient.request(request);
          console.log("result", result.result)
          collection.push(result.result)
      }
    
      clioClient.disconnect();
      sClient.disconnect();
      return collection
    }

  fetchCollection()
    .then(data => { 
      setNFTs(data)
      console.log(data)
    })
    .catch(err => setNFTs([]))
  }, [address]);

  return (
    <div className='container mx-auto'>
      <CollectionSearch searchText={(text) => setAddress(text)} />
      <div className='grid grid-cols-3 gap-4'>
        {nfts.map(token => <NFTCard key={token.nft_id} nft={token} />)}
      </div>
    </div>
  );
}

export default App;