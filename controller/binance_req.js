const NftPokemon = require("../model/navigationbot");
const { senDataTelegram, techbicaleventTelegram, sendInfoTelegram } = require("../controller/sendTelegram");
const { default: axios } = require("axios");
const { addDB, updatePriceDB } = require("./addDB");


const header = {
'Accept':'*/*',
'Accept-Encoding':'gzip',
'Accept-Language':'ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5,zh;q=0.4',
'bnc-uuid':'29d7bc4c-bdd5-49e3-bf2a-247c57fd3af1',
'clienttype':'web',
'Connection':'keep-alive',
'content-type':'application/json',
'Cookie':'cid=cnUiOpqm; bnc-uuid=29d7bc4c-bdd5-49e3-bf2a-247c57fd3af1; source=organic; campaign=www.google.com; _ga=GA1.2.2140208892.1636141045; home-ui-ab=B; isNewRerferral=63; nft-init-compliance=true; fiat-prefer-currency=USD; _gid=GA1.2.1113508153.1637346673; userPreferredCurrency=USD_USD; _h_desk_key=5a6d6d5a3a9649199c8764db6ec8c85a; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2260735633%22%2C%22first_id%22%3A%2217cf19b2318132-0eafbefd2a4613-57b1a33-1382400-17cf19b2319307%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217cf19b2318132-0eafbefd2a4613-57b1a33-1382400-17cf19b2319307%22%7D; BNC_FV_KEY=32a3daabfdc0a435917aa19d96619e902de5ff06; BNC_FV_KEY_EXPIRE=1637526987368; s9r1=A4971DA2D8F5EED85DF4CB38013AF2B5; cr00=5D5E9B503A8FC4E5F57E09407EA7FB9D; d1og=web.60735633.45B02D0ACA6E79C67518A9470208DEC1; r2o1=web.60735633.53606A5F9BB8B7F64924100AFA848A1B; f30l=web.60735633.B42AEA490AEAE8EF43DA6AB49028BB1A; logined=y; isAccountsLoggedIn=y; __BINANCE_USER_DEVICE_ID__={"7f9767285c71f65bc20d132c650b42ce":{"date":1637504821255,"value":"1637504821112fzW58F0HXtugB25XkiB"}}; lang=ru; p20t=web.60735633.9BC44F580E3C28AA87DF37316921E054',
'csrftoken':'991c1b5277c5c2a147df74093c689f0b',
'device-info':'eyJzY3JlZW5fcmVzb2x1dGlvbiI6Ijk2MCwxNDQwIiwiYXZhaWxhYmxlX3NjcmVlbl9yZXNvbHV0aW9uIjoiOTMwLDE0NDAiLCJzeXN0ZW1fdmVyc2lvbiI6IldpbmRvd3MgMTAiLCJicmFuZF9tb2RlbCI6InVua25vd24iLCJzeXN0ZW1fbGFuZyI6InJ1IiwidGltZXpvbmUiOiJHTVQrMyIsInRpbWV6b25lT2Zmc2V0IjotMTgwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC40NSBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJQREYgVmlld2VyLENocm9tZSBQREYgVmlld2VyLENocm9taXVtIFBERiBWaWV3ZXIsTWljcm9zb2Z0IEVkZ2UgUERGIFZpZXdlcixXZWJLaXQgYnVpbHQtaW4gUERGIiwiY2FudmFzX2NvZGUiOiIxOWVhYWM5ZSIsIndlYmdsX3ZlbmRvciI6Ikdvb2dsZSBJbmMuIChBTUQpIiwid2ViZ2xfcmVuZGVyZXIiOiJBTkdMRSAoQU1ELCBBTUQgUmFkZW9uKFRNKSBWZWdhIDggR3JhcGhpY3MgRGlyZWN0M0QxMSB2c181XzAgcHNfNV8wLCBEM0QxMS0yNi4yMC4xMTAzMC4xNTAwMSkiLCJhdWRpbyI6IjEyNC4wNDM0NzUyNzUxNjA3NCIsInBsYXRmb3JtIjoiV2luMzIiLCJ3ZWJfdGltZXpvbmUiOiJFdXJvcGUvTW9zY293IiwiZGV2aWNlX25hbWUiOiJDaHJvbWUgVjk2LjAuNDY2NC40NSAoV2luZG93cykiLCJmaW5nZXJwcmludCI6IjJlMGVhYTI4ZWZkYmViNjFmMTAzODQ4MTRlNDU3OTY3IiwiZGV2aWNlX2lkIjoiIiwicmVsYXRlZF9kZXZpY2VfaWRzIjoiMTYzNzUwNDgyMTExMmZ6VzU4RjBIWHR1Z0IyNVhraUIifQ==',
'DNT':'1',
'fvideo-id':'32a3daabfdc0a435917aa19d96619e902de5ff06',
'Host':'www.binance.com',
'lang':'en',
'Referer':'https://www.binance.com/en/nft/blindBox/detail?productId=158036705914976256',
'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
'sec-ch-ua-mobile':'?0',
'sec-ch-ua-platform':'"Windows"',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'same-origin',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
'x-trace-id':'f22c662c-ec2f-4632-a3af-d8f476d5b5a9',
'x-ui-request-trace':'f22c662c-ec2f-4632-a3af-d8f476d5b5a9'


}

const body = {
    "currency": "",
    "mediaType": "",
    "tradeType": "",
    "amountFrom": "",
    "amountTo": "",
    "categorys": [],
    "keyword": "",
    "orderBy": "set_end_time",
    "orderType": 1,
    "page": 1,
    "rows": 16,
    "productIds": []
  }

  async function binTest() {
    let start = new Date().getTime();

    for (let index = 0; index < 1000; index++) {
      axios.get('https://www.binance.com/en/nft/blindBox/detail?productId=158036705914976256', {headers: header}).then((res) =>{
        let end = new Date().getTime();
        
        if (res.status != 200) {
            console.log(res.status);
        } else {
          console.log(`Запрос ${index} Статус ответа: ${res.status} Время цикла: ${end - start}ms`);
        }
       }).catch(function (error) {
        console.log("Show error notification binTest!");
        console.log(error);
        process.exit(0)
        // setTimeout(() => techbicaleventTelegram(index, error, 'lootex'), 200*index);
        // console.log(error);
        reject(error);
      });
      
    }
    
             
    
    
     
}

module.exports = { binTest };