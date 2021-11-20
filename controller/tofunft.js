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
    "Referrer-Policy": "strict-origin-when-cross-origin",
    'Origin':'https://tofunft.com',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
};

const header2 = {
    'Accept': '*/*',
'Accept-Encoding': 'gzip',
'Accept-Language': 'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4',
'Connection': 'keep-alive',
'Cookie': '_ga=GA1.1.1792403331.1637233387; __cf_bm=Z4Ny02bqpNgIzVSW7v9EsAAz1te2oZOJnpFecsqTSrU-1637414054-0-ARqaS9bAL0GuiM3ciGVKwBveKZJaPt92IXjARaN/GFmUcRWK1mL6q2rgHzCeeLv/XVf558MDr1E4Rc15xxNMVlZskAB3jxeBd0YcsG99FfovPnvZogFUVmKALc8K2txdQQ==; _ga_ERYKG9YKMT=GS1.1.1637413079.3.1.1637414105.0',
'DNT': '1',
'Host': 'tofunft.com',
'Referer': 'https://tofunft.com/collection/kryptomon/items?category=fixed-price',
'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
'sec-ch-ua-mobile': '?0',
'sec-ch-ua-platform': "Windows",
'Sec-Fetch-Dest': 'empty',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Site': 'same-origin',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
}

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
    axios.get('https://tofunft.com/_next/data/_G9VnbUq-OFYDPhY49-s8/en/collection/kryptomon/items.json?slug=kryptomon', {headers: header2}).then((response) => {
    console.log(response.data);    
    
    axios.post('https://tofunft.com/api/searchOrders', body, {headers: header}).then((res) => {
            console.log(res);
        }).catch(function (error) {
          console.log("Show error notification getInfotofunft!");
        
          console.log(error);
          return Promise.reject(error);
        });;
  
    }).catch(function (error) {
        console.log("Show error notification getInfotofunft!");
      
        console.log(error);
        return Promise.reject(error);
      });;


       
}




  module.exports = { getInfotofunft };