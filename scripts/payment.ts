import {  Client,  Wallet, Payment, xrpToDrops, convertStringToHex }  from "xrpl" 
import "dotenv/config"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = process.env.XRP_TEST_WALLET_SEED as string;
const receiverSeed = process.env.XRP_TEST_WALLET_SEED2 as string;

/*
1F7FFC85C39390B0B4A71D03B53DFA7D90E5B8902106C09E0D6BA85AF852EFE1
4E7BFC6CBD824DCFCE7D51C643F9E51CC0898309387286631D89B1F3C616F3E8
655294C0191028D6F6F149FE5B0E73FE277481CC38EC107B4266028F9D79F27C
*/

const payment = async () => {
    console.log("lets get started...");
    await client.connect()

    const issuer_wallet = Wallet.fromSeed(issuerSeed);
    const receiver_wallet = Wallet.fromSeed(receiverSeed);
    const hashes = [ "cf71ebf9953dfa1295e03834a66750393c09cfa84bc3f30f7320ba75d63c9ce7",
    "d0cabf2cc18f9b7a1e323825b720e20f440b530ca5ae232366d407e89ecd2e03",
    "dba3c97a50671f1ab5464d7c54d66faff01457894a8e85a3ac62fad12d71c29c"];
    
    for (let i = 0; i < hashes.length; i++) {
        const hash = hashes[i];
        const tx:Payment  = {
            TransactionType: "Payment",
            Account: issuer_wallet.classicAddress,
            Destination: receiver_wallet.classicAddress,
            Amount: xrpToDrops("1"),
            InvoiceID: hash
            };
        const txnReponse = await client.submitAndWait(tx, {
                            autofill: true,
                            wallet: issuer_wallet,
                    });
        //console.log(txnReponse)
        //console.log("InvoiceID: ", txnReponse.result.InvoiceID)
        const result = "\"" + txnReponse.result.hash +  "\","
        console.log(result)
    }

    await client.disconnect();
    console.log("all done!");
}

payment()