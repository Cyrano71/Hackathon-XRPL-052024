import {  Client,  Wallet, Request, convertStringToHex, NFTokenMint  }  from "xrpl" 
import "dotenv/config"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = process.env.XRP_TEST_WALLET_SEED as string;

const mintToken = async () => {
    let results = "";
    const standby_wallet = Wallet.fromSeed(issuerSeed)
    await client.connect()
    results += '\nConnected. Minting NFT.'

    const URI = "https://maps.app.goo.gl/sPTHyPDh6sHT9jCD8"
    const memoData = {
      floor: 2,
      appartmentId : 3,
      txIds: [
        "1F7FFC85C39390B0B4A71D03B53DFA7D90E5B8902106C09E0D6BA85AF852EFE1",
        "4E7BFC6CBD824DCFCE7D51C643F9E51CC0898309387286631D89B1F3C616F3E8",
        "655294C0191028D6F6F149FE5B0E73FE277481CC38EC107B4266028F9D79F27C",
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