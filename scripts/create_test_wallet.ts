import {  Client }  from "xrpl" 

const client = new Client("wss://s.altnet.rippletest.net:51233")

const main = async () => {
  console.log("lets get started...");
  await client.connect();

  const { wallet: wallet1, balance: balance1 } = await client.fundWallet()

  console.log(wallet1);

  await client.disconnect();
  console.log("all done!");
};

main();