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


let header = {
  'accept':'application/json, text/plain, */*',
  'content-type': 'application/json',
'accept-encoding':'gzip, deflate, br',
'accept-language':'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4',
'dnt':'1',
'origin':'https://app.mochi.market',
'referer':'https://app.mochi.market/',
'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
'sec-ch-ua-mobile':'?0',
'sec-ch-ua-platform':'"Windows"',
'sec-fetch-dest':'empty',
'sec-fetch-mode':'cors',
'sec-fetch-site':'same-site',
'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
'Host':'api.mochi.market',
'Content-Length':'0'
}


 
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



// const jobs = new CronJob('1 * * * * *', function() {
 
 

// });
// jobs.start();
let start = new Date().getTime();
axios.get("https://api.mochi.market/sellOrder/byCollection/56/0xc33d69a337b796a9f0f7588169cd874c3987bde9?skip=0&limit=20", { headers: header}).then((response) => {
  let ctype = response.headers["content-type"];
  console.log(ctype);
  //   if (ctype.includes("charset=ISO-8859-1")) {
  //       response.data = iconv.decode(response.data, 'ISO-8859-1');
  //   }
  
  
  console.log(response.data);
  


  return response;
  // response[0].forEach(element => {
  //   console.log(element);
    
  // });
  let end = new Date().getTime();
console.log(`Данные: ${end - start}ms`);
});




 
const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Подключение прошло на порт " + port);
});
