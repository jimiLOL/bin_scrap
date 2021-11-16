const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const app = express();
const http = require("http");

const cyrillicToTranslit = require("cyrillic-to-translit-js");
const { Telegraf, Markup } = require("telegraf");
const { stringify } = require("query-string");
const { json } = require("body-parser");
const server = require("http").createServer(app);
const token = "2131334001:AAHJ-9EVbfq8BlxSbYBeTQOSuy8ClXnEMq8";
const fs = require("fs");
const moment = require("moment");
const CronJob = require('cron').CronJob;
const { default: axios } = require("axios");

require("dotenv/config");

const bot = new Telegraf(token);


let header = {'accept':'*/*',
  'accept-encoding':'gzip, deflate, br',
  'accept-language':'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4',
  'bnc-uuid':'29d7bc4c-bdd5-49e3-bf2a-247c57fd3af1',
  'clienttype':'web',
  'content-length':'229',
  'content-type':'application/json',
  'cookie':'cid=cnUiOpqm; bnc-uuid=29d7bc4c-bdd5-49e3-bf2a-247c57fd3af1; source=organic; campaign=www.google.com; _ga=GA1.2.2140208892.1636141045; home-ui-ab=B; isNewRerferral=63; nft-init-compliance=true; fiat-prefer-currency=USD; _gid=GA1.2.1835617838.1637017805; BNC_FV_KEY_EXPIRE=1637104208072; BNC_FV_KEY=32a3daabfdc0a435917aa19d96619e902de5ff06; lang=ru; cr00=4CCAF496ED92C26A00740474182C7AC2; d1og=web.333435564.289E5546E923715EFA38364F90CE4849; r2o1=web.333435564.94F4FFB2BACC4DC751942703A9E83A2D; f30l=web.333435564.2DD71326030D1E0BBF4D8C029E82FD50; logined=y; isAccountsLoggedIn=y; p20t=web.333435564.31F5B5C31F01317B0F966A4AE7D90C07; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22333435564%22%2C%22first_id%22%3A%2217cf19b2318132-0eafbefd2a4613-57b1a33-1382400-17cf19b2319307%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%7D%2C%22%24device_id%22%3A%2217cf19b2318132-0eafbefd2a4613-57b1a33-1382400-17cf19b2319307%22%7D; userPreferredCurrency=USD_USD',
  'csrftoken':'7c4cacd9065773cc1898f0f78ee8070a',
  'device-info':'eyJzY3JlZW5fcmVzb2x1dGlvbiI6Ijk2MCwxNDQwIiwiYXZhaWxhYmxlX3NjcmVlbl9yZXNvbHV0aW9uIjoiOTMwLDE0NDAiLCJzeXN0ZW1fdmVyc2lvbiI6IldpbmRvd3MgMTAiLCJicmFuZF9tb2RlbCI6InVua25vd24iLCJzeXN0ZW1fbGFuZyI6InJ1IiwidGltZXpvbmUiOiJHTVQrMyIsInRpbWV6b25lT2Zmc2V0IjotMTgwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk1LjAuNDYzOC42OSBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJQREYgVmlld2VyLENocm9tZSBQREYgVmlld2VyLENocm9taXVtIFBERiBWaWV3ZXIsTWljcm9zb2Z0IEVkZ2UgUERGIFZpZXdlcixXZWJLaXQgYnVpbHQtaW4gUERGIiwiY2FudmFzX2NvZGUiOiIxOWVhYWM5ZSIsIndlYmdsX3ZlbmRvciI6Ikdvb2dsZSBJbmMuIChBTUQpIiwid2ViZ2xfcmVuZGVyZXIiOiJBTkdMRSAoQU1ELCBBTUQgUmFkZW9uKFRNKSBWZWdhIDggR3JhcGhpY3MgRGlyZWN0M0QxMSB2c181XzAgcHNfNV8wLCBEM0QxMS0yNi4yMC4xMTAzMC4xNTAwMSkiLCJhdWRpbyI6IjEyNC4wNDM0NzUyNzUxNjA3NCIsInBsYXRmb3JtIjoiV2luMzIiLCJ3ZWJfdGltZXpvbmUiOiJFdXJvcGUvTW9zY293IiwiZGV2aWNlX25hbWUiOiJDaHJvbWUgVjk1LjAuNDYzOC42OSAoV2luZG93cykiLCJmaW5nZXJwcmludCI6Ijg2MzhjN2FhZGNlMDhmODllMjJjMGFlMmQ3YWYxYjhlIiwiZGV2aWNlX2lkIjoiIiwicmVsYXRlZF9kZXZpY2VfaWRzIjoiIn0=',
  'dnt':'1',
  'fvideo-id':'32a3daabfdc0a435917aa19d96619e902de5ff06',
  'lang':'en',
  'origin':'https://www.binance.com',
  'referer':'https://www.binance.com/en/nft/goods/detail?productId=12371885&isProduct=1',
  'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
  'sec-ch-ua-mobile':'?0',
  'sec-ch-ua-platform':"Windows",
  'sec-fetch-dest':'empty',
  'sec-fetch-mode':'cors',
  'sec-fetch-site':'same-origin',
  'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
  'x-trace-id':'9135f784-70da-4648-ae8f-f5375404ae08',
  'x-ui-request-trace':'9135f784-70da-4648-ae8f-f5375404ae08',
  "Host":'www.binance.com'}


 
let data = {
  "currency": "",
  "mediaType": "",
  "tradeType": "",
  "amountFrom": "",
  "amountTo": "",
  "categorys": [],
  "keyword": "",
  "orderBy": "amount_sort",
  "orderType": -1,
  "page": 1,
  "rows": 20,
  "productIds": []
}




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let start = new Date().getTime();

axios.post("https://www.binance.com/bapi/nft/v1/friendly/nft/product-list", data,  { headers: header}).then((response) => {
  console.log(response.data.data);
  let end = new Date().getTime();
console.log(`Данные: ${end - start}ms`);
})

 
const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Подключение прошло на порт " + port);
});
