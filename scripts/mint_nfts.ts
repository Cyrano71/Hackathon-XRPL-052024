import {  Client,  Wallet, Request, convertStringToHex, NFTokenMint  }  from "xrpl" 
import "dotenv/config"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = process.env.XRP_TEST_WALLET_SEED as string;

const mintToken = async () => {
    let results = "";
    const standby_wallet = Wallet.fromSeed(issuerSeed)
    await client.connect()
    results += '\nConnected. Minting NFT.'

    const URI = "https://maps.app.goo.gl/rcPVzxCS5JQShxkT6"
    const memoData = {
      name: "15 Rue de Vaugirard, 75006 Paris",
      collectionName: "75006",
      floor: 1,
      appartmentId : 7,
      txIds: [
        "1E5FCA9DE685FBD30F24B4403A487F045DB1A7B7DFA105EB153D8CC337F0DA09",
        "20CCE2D19D631C647C66E8B6FDF2BF51EBCBC1081757B8688459695DF43B7FE7",
        "63E558768FD8969226EFFA86C65B94E05D0025A8D628D29A80115583543C9556",
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