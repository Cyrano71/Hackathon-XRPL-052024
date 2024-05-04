import {  Client,  Wallet, Payment, xrpToDrops, convertStringToHex }  from "xrpl" 
import crypto from "crypto";

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = 'sEdVH8bUeEnsx5SDC1VAqm7YCJ5QiLi'
const receiverSeed = 'sEdTLkGGQLbow2ydptZRjYvqS3c5Pxe'

/*
1F7FFC85C39390B0B4A71D03B53DFA7D90E5B8902106C09E0D6BA85AF852EFE1
4E7BFC6CBD824DCFCE7D51C643F9E51CC0898309387286631D89B1F3C616F3E8
655294C0191028D6F6F149FE5B0E73FE277481CC38EC107B4266028F9D79F27C
*/

const payment = async () => {
    console.log("lets get started...");
    await client.connect();

    const issuer_wallet = Wallet.fromSeed(issuerSeed);
    const receiver_wallet = Wallet.fromSeed(receiverSeed);
    const reason = "content of pdf bill payment"
    var hash = crypto.createHash('sha256').update(reason).digest('hex');
    console.log("Hash Document", hash)
    const tx:Payment  = {
            TransactionType: "Payment",
            Account: issuer_wallet.classicAddress,
            Destination: receiver_wallet.classicAddress,
            Amount: xrpToDrops("1"),
            InvoiceID: hash
            };
    const result = await client.submitAndWait(tx, {
                         autofill: true,
                         wallet: issuer_wallet,
                 }); 
                
    //console.log(result)
    console.log("InvoiceID: ", result.result.InvoiceID)
    console.log("Hash Transaction", result.result.hash)

    await client.disconnect();
    console.log("all done!");
}

payment()