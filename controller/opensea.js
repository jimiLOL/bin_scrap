const { default: axios } = require("axios");
const tunnel = require("tunnel");

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "127.0.0.1",
    port: 8866,
  },
  rejectUnauthorized: false,
});

const header = {
    'Host':'api.opensea.io',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 YaBrowser/20.7.3.100 Yowser/2.5 Safari/537.36',
'Accept':'*/*',
'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
'Accept-Encoding':'gzip',
'Referer':'https://docs.opensea.io/',
'x-readme-api-explorer':'4.73.0',
'Origin':'https://docs.opensea.io',
'Connection':'keep-alive',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'cross-site'
};



function opensea() {

    axios.get('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20', {headers: header}).then((res)=>{
    if (res.status != 200) {
        console.log(res.status);

    } else {
        console.log(res.status);
    }   
  
    }).catch((e) => {
        console.log('Ошибка запроса');
        console.log(e?.response.data);
        process.exit(1)
    })

}


module.exports = {opensea}