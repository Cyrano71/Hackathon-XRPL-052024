# XRPL Hackathon

## First Day

### Docs

https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/quickstart/js/ripplex3-mint-nfts.js

https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_nfts/

https://xrpl.org/docs/references/protocol/transactions/types/nftokenmint/

### Commands

1. Create txs and use the hash of the content of the billing doc as InvoiceID

npm run payment

2. Mint the NFT and include in the memo data the list of txs

npm run mint_nfts

3. Get the NFT Token Id on tesnet explorer

4. Get the NFT memo data with the NFT token id

npm run get_memo