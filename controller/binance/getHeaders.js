
const binanceAdminCookies = require("./../../model/binanceAdminCookies");

// binanceAdminCookies.find({ enable: true }, (err, call) => {
//   if (err) console.log(err);

//   if (call) {
//     call.forEach((cookies) => {
//       // buyInit(cookies);
//     });

//   }
// });
let headers = {
  Host: "www.binance.com",
  Accept: "*/*",
  "Accept-Encoding": "gzip",
  Referer: `https://www.binance.com/`,
  lang: "ru",
  "content-type": "application/json",
  clienttype: "web",
  Origin: "https://www.binance.com",
  Connection: "keep-alive",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
};
var header = {};
function getNewHeaders(headers) {
  try {
    let full = "";


    let json = JSON.parse(header.Cookie);
    json.cookies.forEach((element) => {
      full = full + element.name + "=" + element.value + "; ";
    });
    headers["x-nft-checkbot-token"] = header.xnftcheckbottoken;
    headers["user-agent"] = header.UserAgent;
    headers["x-ui-request-trace"] = header.xuirequesttrace;
    headers["x-trace-id"] = header.xtraceid;
    headers["bnc-uuid"] = header.bncuuid;
    headers["device-info"] = header.deviceinfo;
    headers["fvideo-id"] = header.deviceinfo;
    headers.csrftoken = header.csrftoken;
    headers["x-nft-checkbot-sitekey"] =
      "6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_";
    // headers.cookie = full;
  } catch (e) {
    console.log(e);
    console.log(header);

  }






  return headers
}
function getHeaders() {
  return new Promise((resolve, reject) => {
    binanceAdminCookies.find({ enable: true }, (err, call) => {
      if (err) console.log(err);

      if (call) {
        console.log('getHeaders');

        call.forEach((cookies) => {
          header = cookies;
          // let json = JSON.parse(cookies.Cookie);

          //         console.log(json);
          //         process.exit(0)

        });
        delete header._id;
        delete header.user;
        // setTimeout(() => {
        //   console.log(header._id);
        //   getHeaders()
        //   resolve(getNewHeaders(headers))
        // }, 5000); // для рекурсивного обновления header, как выяснелось для парсинга это не нужно. достатчно один раз собрать данные. это может понадобится, если мы хотим получать валидные ключи headers["x-nft-checkbot-token"], 05ки мы можем решить этот вопрос через капчамонстр при необходимости.
        resolve(getNewHeaders(headers))

      } else {
        console.log('Не получили заголовки для работы');
      }
    });
  })

}

module.exports = { getHeaders, getNewHeaders }