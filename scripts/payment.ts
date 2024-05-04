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
    const hashes = [ "563514872a995625dea10fbafa81fa11bced83181e74939513f6b70543fd6b2c",
    "4250cca56b7a4929545a23117c2f85a71bd83d289b5a01cb36fc515b90b3ab6e",
    "270e3ad4be0311452c39e9e9cf21550d8799e022df1494d7de56e80637cc6ce7",];
    
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
        console.log("Hash Transaction", txnReponse.result.hash)
    }

    await client.disconnect();
    console.log("all done!");
}

payment()