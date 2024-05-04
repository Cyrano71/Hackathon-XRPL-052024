
const getIfps = async () => {
    //const token = "Bearer "
    /*
    const options = {
        method: 'POST',
        headers: {Authorization: token, 'Content-Type': 'application/json'},
        body: '{"hashToPin":"QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"}'
      };
      console.log(options)
      
      fetch('https://api.pinata.cloud/pinning/pinByHash', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        */
    const res = await fetch("https://gray-cheap-lamprey-814.mypinata.cloud/ipfs/QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH")
    console.log(res);
}

getIfps();