import {  Client,  Wallet, Request }  from "xrpl" 
import "dotenv/config"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = process.env.XRP_TEST_WALLET_SEED as string;

const getNFT = async () => {
    let results = "";
    const standby_wallet = Wallet.fromSeed(issuerSeed);
    console.log(standby_wallet)
    await client.connect()
    results += '\nConnected. Getting NFTs...'
    const request: Request = {
        command: "account_nfts",
        account: standby_wallet.classicAddress
      };
    const nfts = await client.request(request)
    results += '\nNFTs:\n ' + JSON.stringify(nfts,null,2)
    console.log(results);
    /*
    type NFTData = {name: string, url: string};
    const data: NFTData = JSON.parse(convertHexToString(nfts.result.account_nfts[0].URI!))
    console.log("url : ", data.url);
    console.log("name : ", data.name);
    */
    client.disconnect()
}

getNFT();