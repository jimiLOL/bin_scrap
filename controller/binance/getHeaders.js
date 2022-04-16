
const binanceAdminCookies = require("./../../model/binanceAdminCookies");

binanceAdminCookies.find({ enable: true }, (err, call) => {
    if (err) console.log(err);
  
    if (call) {
      call.forEach((cookies) => {
        // buyInit(cookies);
      });
  
    }
  });

var header = {};
function getNewHeaders(headers) {
    
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
    headers.cookie = full;

    return headers
}
  function getHeaders() {
      return new Promise((resolve, reject) => {
          console.log('getHeaders');
        binanceAdminCookies.find({ enable: true }, (err, call) => {
            if (err) console.log(err);
          
            if (call) {
              call.forEach((cookies) => {
                header = cookies;
             
              });
              delete header._id;
              delete header.user;
              setTimeout(() => {
                getHeaders()
                resolve()
            }, 5000);
          
            } else {
                console.log('Не получили заголовки для работы');
            }
          });
      })
   
  }

  module.exports = {getHeaders, getNewHeaders}