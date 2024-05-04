import {  Client, Request, NFTHistoryResponse, convertHexToString }  from "xrpl" 

const client = new Client("wss://clio.altnet.rippletest.net:51233/")

/*
000861A83021CE83D3E15325146E1FBE1F6EADDB34D946D6A97A2F8A000606EF
*/

const getMemo = async () => {
    let results = "";
    await client.connect()
    results += '\nConnected. Getting NFTs...'
    const request: Request = {
        command: "nft_history",
        nft_id: "000861A83021CE83D3E15325146E1FBE1F6EADDB34D946D6C060008B000606F0"
      };   
    const result: NFTHistoryResponse = await client.request(request)
    console.log(result.result.transactions);
    console.log(convertHexToString(result.result.transactions[0].tx!.Memos![0]!.Memo.MemoData!))
    client.disconnect()
}

getMemo();