import {  Client,  Wallet, Request, convertStringToHex, NFTokenMint  }  from "xrpl" 

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = 'sEdTLkGGQLbow2ydptZRjYvqS3c5Pxe'

const mintToken = async () => {
    let results = "";
    const standby_wallet = Wallet.fromSeed(issuerSeed)
    await client.connect()
    results += '\nConnected. Minting NFT.'
        
    // Note that you must convert the token URL to a hexadecimal 
    // value for this transaction.
    // ------------------------------------------------------------------------
    const transactionJson: NFTokenMint = {
      "TransactionType": "NFTokenMint",
      "Account": standby_wallet.classicAddress,
      "URI": convertStringToHex("https://drive.google.com/file/d/1dTibJaUiWa5IiatFDh0Y_u7jJLc3N0eH/view?usp=drive_link"),
      "Flags": 8,
      "TransferFee": 25000,
      "NFTokenTaxon": 0 //Required, but if you have no use for it, set to zero.
    };

    // ----------------------------------------------------- Submit signed blob 
    const tx = await client.submitAndWait(transactionJson, { wallet: standby_wallet} )
    const request: Request = {
        command: "account_nfts",
        account: standby_wallet.classicAddress
      };
    const nfts = await client.request(request)

    // ------------------------------------------------------- Report results
    results += '\n\nTransaction result: '+ tx.result!.meta!
    results += '\n\nnfts: ' + JSON.stringify(nfts, null, 2)
    console.log(results);
    const balance = (await client.getXrpBalance(standby_wallet.address))
    console.log("balance : ", balance);
    client.disconnect()
}

mintToken();