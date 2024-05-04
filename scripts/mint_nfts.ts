import {  Client,  Wallet, Request, convertStringToHex, NFTokenMint  }  from "xrpl" 
import "dotenv/config"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = process.env.XRP_TEST_WALLET_SEED as string;

/*
https://maps.app.goo.gl/rcPVzxCS5JQShxkT6
15 Rue de Vaugirard, 75006 Paris

https://maps.app.goo.gl/T6KKfWjnsyaGA9Jn7
81 Rue de Grenelle, 75007 Paris
*/

const mintToken = async () => {
    let results = "";
    const standby_wallet = Wallet.fromSeed(issuerSeed)
    await client.connect()
    results += '\nConnected. Minting NFT.'

    const URI = "https://maps.app.goo.gl/T6KKfWjnsyaGA9Jn7"
    const memoData = {
      name: "81 Rue de Grenelle, 75007 Paris",
      collectionName: "75007",
      floor: 2,
      appartmentId : 3,
      txIds: [
        "6881BB021632F37416B582E4B282AD51E3371C7F3C0C05241FA211AE2EC231FF",
        "EE43EFD562CD53366921163124B5B215308302D82F545B51331161614A311B85",
        "670A6F88B46804AC9C6ADEB92DD9DD631359A0BD99DCE4538A6B746629007581",
  ]}

  const transactionJson: NFTokenMint = {
    "TransactionType": "NFTokenMint",
    "Account": standby_wallet.classicAddress,
    "URI": convertStringToHex(URI),
    "Flags": 8,
    "TransferFee": 25000,
    "NFTokenTaxon": 0, //Required, but if you have no use for it, set to zero.
    "Memos": [
      {
          "Memo": {
              "MemoType": convertStringToHex("Metadata"),
              "MemoData": convertStringToHex(JSON.stringify(memoData)),
          }
      }
  ]
  };

    // ----------------------------------------------------- Submit signed blob 
    const tx = await client.submitAndWait(transactionJson, { wallet: standby_wallet} )
    const request: Request = {
        command: "account_nfts",
        account: standby_wallet.classicAddress
      };
    const nfts = await client.request(request)

    // ------------------------------------------------------- Report results
    console.log("Transaction result:", tx.result)
    results += '\n\nnfts: ' + JSON.stringify(nfts, null, 2)
    console.log(results);
    const balance = (await client.getXrpBalance(standby_wallet.address))
    console.log("balance : ", balance);
    client.disconnect()
}

/*
          
    // Note that you must convert the token URL to a hexadecimal 
    // value for this transaction.
    // ------------------------------------------------------------------------
    const data = JSON.stringify({
      "url" : "https://drive.google.com/file/d/1dTibJaUiWa5IiatFDh0Y_u7jJLc3N0eH/view?usp=drive_link", 
      "name": "attestation-de-propriété-D2098.png"
    });
    
    const transactionJson: NFTokenMint = {
      "TransactionType": "NFTokenMint",
      "Account": standby_wallet.classicAddress,
      "URI": convertStringToHex(data),
      "Flags": 8,
      "TransferFee": 25000,
      "NFTokenTaxon": 0, //Required, but if you have no use for it, set to zero.
      "Memos": [
        {
            "Memo": {
                "MemoType": convertStringToHex("Metadata"),
                "MemoData": convertStringToHex(JSON.stringify({"name": "attestation-de-propriété-D2098.png"})),
            }
        }
    ]
    };
    */

mintToken();