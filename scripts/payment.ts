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
    const hashes = [ "357067877955dd0537dd42daafd458cbd0c4d04ed0c225cad460126b1b2a34cf",
    "32c7b422acebb4987f5719ba5883fc98d31235e912db4f7510c0dc82dea7d182",
    "d2e5c4ca428abcf82f6c8a2bf69bcd1de2f8e856475486d8d492da17f01776ff",];
    
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