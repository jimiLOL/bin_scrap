const NftPokemon = require("../model/navigationbot");
const { senDataTelegram, techbicaleventTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB, updatePriceDB } = require("./addDB");

const header = {
'Accept':'*/*',
'Accept-Encoding':'gzip',
'Accept-Language':'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4',
'Connection':'keep-alive',
'Content-Length':'110',
'Content-Type':'application/json; charset=utf-8',
'Cookie':'_ga=GA1.1.1792403331.1637233387; _ga_ERYKG9YKMT=GS1.1.1637413079.3.1.1637414638.0',
'DNT':'1',
'Host':'tofunft.com',
'Origin':'https://tofunft.com',
'Referer':'https://tofunft.com/collection/kryptomon/items',
'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
'sec-ch-ua-mobile':'?0',
'sec-ch-ua-platform':'"Windows"',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'same-origin',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
'x-tofu-signature':'0000001637416599i+vDhJu++L1D293vsHNopQNE1+BqE8bya6R27+NIuQM='
};

async function getInfotofunft() {

}




  module.exports = { getInfotofunft };