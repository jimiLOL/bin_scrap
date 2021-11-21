const NftPokemon = require("../model/navigationbot");
const fs = require('fs');
const { senDataTelegram, techbicaleventTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB, updatePriceDB } = require("./addDB");
const https = require('https');
const http = require("http");
// const ca = fs.readFileSync('../FiddlerRootCertificate.crt', 'utf8')

// const httpsAgent = new https.Agent({ ca: ca });


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
    "cookie": "_ga_ERYKG9YKMT=GS1.1.1637500125.2.1.1637500150.0; _ga=GA1.1.1507123920.1637494394; __cf_bm=vrpLTmExh2FzqLYAsDinfYTQ1eGhnVP26DvRDCz6488-1637500128-0-AZBrn423yqk1j83R7mXtt6ez0epMMdtGi6WPlf0aPHyduXZ8iRFIquhyw840LoYYuvWDB2I5JND3q32+yRJYZNZcHAXGccW13QMuGbPB3ZqZ/suRGGQMCrO7gDsRcP/hog==",
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
'Cookie': '_ga_ERYKG9YKMT=GS1.1.1637500125.2.1.1637500150.0; _ga=GA1.1.1507123920.1637494394; __cf_bm=vrpLTmExh2FzqLYAsDinfYTQ1eGhnVP26DvRDCz6488-1637500128-0-AZBrn423yqk1j83R7mXtt6ez0epMMdtGi6WPlf0aPHyduXZ8iRFIquhyw840LoYYuvWDB2I5JND3q32+yRJYZNZcHAXGccW13QMuGbPB3ZqZ/suRGGQMCrO7gDsRcP/hog==',
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

//     axios.get('https://tofunft.com/_next/data/_G9VnbUq-OFYDPhY49-s8/en/collection/kryptomon/items.json?slug=kryptomon', {headers: header2}).then((response) => {
//     console.log(response.data);    
    
    

       

async function getInfotofunft() {
axios.post('https://tofunft.com/api/searchOrders', body, {headers: header}, {httpsAgent: httpsAgent}).then((res) => {
            console.log(res);
        }).catch(function (error) {
          console.log("Show error notification getInfotofunft!");
        
          console.log(error);
          return Promise.reject(error);
        });;
  
  


    }

  module.exports = { getInfotofunft };