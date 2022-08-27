const NftPokemon = require("../model/nft_detalii");
const { senDataTelegram, techbicaleventTelegram, sendInfoTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const tunnel = require("tunnel");

const header = {
    'accept': 'application/json, text/plain, */*',
'accept-encoding': 'gzip', 
'accept-language': 'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4',
'dnt': '1',
'if-none-match': 'W/"1792-lflyA46lG42C6CfMs0fPhwyHIUo"',
'origin': 'https://lootex.io',
'referer': 'https://lootex.io/',
'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
'sec-ch-ua-mobile': '?0',
'sec-ch-ua-platform': '"Windows"',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-site',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'  
};
const agent = tunnel.httpsOverHttp({
    proxy: {
      host: "127.0.0.1",
      port: 8866,
    },
    rejectUnauthorized: false,
  });
async function getinfoLootex(tokenId, index, contract) {
    return new Promise((resolve, reject) => {
    axios.get(`https://api.dex.lootex.io/v2/assets/${contract}/${tokenId}?force=true`, {headers: header, httpsAgent: agent,  timeout: 3000}).then((res)=>{
        if (res.status == 404) {
            console.log('Такого контаркта не существует на lootex');
        }
 
     
        if (res.data.length != undefined || res.data.length != null) {
            res.data[0].orders.forEach(element => {
                if (element?.side == 'MAKER') {
                    Object.assign(res.data[0], {attributes: res.data[0]?.traits}, {price: element.price});
                  
                    updatePriceDB(res.data?.tokenId, element?.price, 'lootex', res.data[0]?.contractAddress);
                    senDataTelegram(res.data[0], `https://lootex.io/assets/${contract}/${element.tokenId}`, index)
                   
              
            
                }
               
                
            })
            res.data = 0;
            resolve(res);

        }
    }).catch(function (error) {
        console.log("Show error notification getinfoLootex!");
        setTimeout(() => techbicaleventTelegram(index, error, 'lootex'), 200*index);
        // console.log(error);
        reject(error);
      });

    })

}


  module.exports = { getinfoLootex };