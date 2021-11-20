const NftPokemon = require("../model/navigationbot");
const { senDataTelegram, techbicaleventTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB, updatePriceDB } = require("./addDB");

const header = {
    "accept": "*/*",
    "accept-language": "ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4",
    "content-type": "application/json; charset=utf-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-tofu-signature": "0000001637416599i+vDhJu++L1D293vsHNopQNE1+BqE8bya6R27+NIuQM=",
    "cookie": "_ga=GA1.1.1792403331.1637233387; _ga_ERYKG9YKMT=GS1.1.1637413079.3.1.1637414638.0",
    "Referer": "https://tofunft.com/collection/kryptomon/items",
    "Referrer-Policy": "strict-origin-when-cross-origin"
};

let body = {
    "filters": {
        "attributes": {},
        "contracts": [
            232
        ]
    },
    "offset": 20,
    "limit": 20
};
async function getInfotofunft() {
    axios.post('https://tofunft.com/api/searchOrders', body, {headers: header}).then((res) => {
          console.log(res);
      }).catch(function (error) {
        console.log("Show error notification getInfotofunft!");
      
        console.log(error);
        return Promise.reject(error);
      });;


       
}




  module.exports = { getInfotofunft };