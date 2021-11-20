const NftPokemon = require("../model/navigationbot");
const { senDataTelegram, techbicaleventTelegram, sendInfoTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB, updatePriceDB } = require("./addDB");

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

async function getinfoLootex(tokenId, index) {
    return new Promise((resolve, reject) => {
    axios.get(`https://api.dex.lootex.io/v2/assets/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${tokenId}?force=true`, {headers: header}).then((res)=>{
     
        if (res.data.length != undefined || res.data.length != null) {
            res.data[0].orders.forEach(element => {
                if (element?.side == 'MAKER') {
                    updatePriceDB(res.data?.tokenId, element?.price, 'lootex');
                    Object.assign(res.data, {attributes: res.data.traits}, {price: element.price})
                    sendInfoTelegram(res.data.attributes)
                 console.log(res.data.attributes);
   
                    senDataTelegram(element, `https://lootex.io/assets/0xc33d69a337b796a9f0f7588169cd874c3987bde9/${element?.price}`, index)
                
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
      });;

    })

}


  module.exports = { getinfoLootex };