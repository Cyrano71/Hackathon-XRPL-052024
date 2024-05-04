import {  Client, Request, NFTHistoryResponse, convertHexToString }  from "xrpl" 

const client = new Client("wss://clio.altnet.rippletest.net:51233/")

const getMemo = async () => {
    let results = "";
    await client.connect()
    results += '\nConnected. Getting NFTs...'
    const request: Request = {
        command: "nft_history",
        nft_id: "000861A8D783EBF762A2BC5020388F906975809BCFBCFB4041CD30060003CB6B"
      };   
    const result: NFTHistoryResponse = await client.request(request)
    console.log(convertHexToString(result.result.transactions[0].tx!.Memos![0]!.Memo.MemoData!))
    client.disconnect()
}

getMemo();