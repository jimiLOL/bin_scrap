// Получаем данные из фильтра бинанса, отстование api 1-2 минуты - не подходит для мисклика, но может подходить для парсинга.

const { default: axios } = require("axios");
const tunnel = require("tunnel");
const { proxy } = require("../../proxy_list");
const { UA } = require("../../ua");
const {getNaemListNFT} = require("./getNftStat");
const {arrayNFTCollectionName} = require("./nftArrayData");
const {
    techbicaleventTelegram,
  } = require("../sendTelegram");

let num = 10 // итерациий
let size = 50;
let arrayNFT = [];



//   proxyOptions = {
//     host: proxyArray[0],
//     port: proxyArray[1],
//     proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}`,
// };
// agent = tunnel.httpsOverHttp({
//     proxy: proxyOptions,
//     rejectUnauthorized: false,
// });


let header = {
    Host: "www.binance.com",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
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


let body = {
    page: 1,
    size: size,
    params: {
        // keyword: "",
        currency: "BUSD",
        // nftType: null,
        // amountFrom: "0.001",
        // amountTo: "3",
        setStartTime: new Date().getTime(),
        // setStartTime: (function() {return new Date().getTime()})(),
        orderBy: "list_time",
        orderType: -1,
        // serialNo: null,
        tradeType: 0
    }
};
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function init() {
// arrayNFT = await getNaemListNFT();

    for (let i = 0; i < proxy.length; i++) {
        await getInfoBinNFTMysteryBox(proxyInit(proxy[i]), i);
        if (i == proxy.length -1) {
            console.log('!');
            init();
        }


    }
    // proxy.forEach(async (proxy, i) => {
    //     await getInfoBinNFTMysteryBox(proxyInit(proxy), i)


    // });

}


function proxyInit(proxy) {
    let proxyArray = proxy.split(":", 4);

    return { host: proxyArray[0], port: proxyArray[1], proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}` }

}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

        // поменять элементы местами
        // мы используем для этого синтаксис "деструктурирующее присваивание"
        // подробнее о нём - в следующих главах
        // то же самое можно записать как:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function random() {
    let min = Math.ceil(1);
    let max = Math.floor(3);
    let n = Math.floor(Math.random() * (max - min)) + min;
    if (n == 1) {
        return 'list_time'
    } else {
        return 'set_end_time'

    }
}

function getInfoBinNFTMysteryBox({ host: proxyHost, port: portHost, proxyAuth: proxyAuth }, i) {
    return new Promise(async (resolve, reject) => {
        // header["User-Agent"] = UA[i];
        // console.log(header);
        // num = await initNum();
        console.log(num);
        let proxyOptions = {
            host: proxyHost,
            port: portHost,
            proxyAuth: proxyAuth,
            headers: {
                'User-Agent': UA[i]
              },
        };
        let agent = tunnel.httpsOverHttp({
            proxy: proxyOptions,
            rejectUnauthorized: false,
        });

        let breakSwitch = false;
        getIP(agent);

       

        for (let index = 1; index <= num; index++) {

            if (breakSwitch) {
                break
            }

            shuffle(UA);
            header["User-Agent"] = UA[index];
            body.page = index; // смена страницы -- не используем, просматриваем всегда первую страницу результатов
            body.params.setStartTime = (function() {return new Date().getTime()})();
            // body.params.orderBy = random();
            let data = new Date().getTime();
          
            axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header, httpsAgent: agent }).then(res => {
                console.log(res.status + ' ' + index);
                console.log(res.data.data[0]);
                process.exit(0)
                
                // console.log(num);
                if (index >= Math.ceil(num / 2)) {
                    num = Math.ceil(res.data.data.total/size);
                    resolve();
                    breakSwitch = true;
                };

                if (res.data.data?.data[0]?.setStartTime != undefined) {
                    console.log(res.data.data.data[0].productId);


                } else {
                    console.log(res.data.data);


                }

                arrayIteration(res.data.data.data);
                // let n = res.data.data.total / 100;
                // console.log(Math.ceil(n));
                let newData = new Date().getTime();
                console.log(`Date cycle^ ${newData - data} ms`);

                // return Math.ceil(n)
            }).catch(e => {
                // console.log('Error');
                breakSwitch = true;
                // header.lang = 'ru';
            
                timeout(10000*index).then(()=> resolve())
                // reject();
                console.log(e);
                console.log(agent);
            })

        }
    })


}

async function initNum() {
    const number = await axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header }).then(res => {
        let n = res.data.data.total / 100;
        console.log(res.data.data);

        return Math.ceil(n)
    }).catch(e => {
        // console.log('Error');
        console.log(e?.response?.statusText);
    }); // изначально я хотел перебрать все значения в базе @total@ теперь используем констануту num
    return number
}

function arrayIteration(array) {
    // функция для фильтрации средних цен из getNaemListNFT
    // array.forEach((ele, i) => {
    //     // console.log(ele);

    //    let nftMinimumPrice = arrayNFT.filter(x=> x.title == ele.title && (x.minimum - x.minimum*0.4) >= ele.amount);
    //    let nftCollectionName = arrayNFTCollectionName.filter(x=> x.name == ele.title && x.price >= ele.amount);
    // //    let nftCollectionName2 = arrayNFTCollectionName.filter(x=> x.name == ele.title);
    //    if (nftMinimumPrice.length > 0) {
    //     // console.log(nftMinimumPrice);
    //     // console.log(ele);
    //    sendMessage(`По минимальному прайсу title: ${ele.title} ${ele.amount}_$ productId: ${ele.productId}`);

    //    } else if (nftCollectionName.length > 0) {
    //     // console.log(nftCollectionName);
    //     // console.log(ele);
    //    sendMessage(`По имени коллекции title: ${ele.title} ${ele.amount}_$ productId: ${ele.productId}`);

    //    }
    // //     else if (ele.title == "Syahrini's Metaverse Tour" && ele.amount == 1) {
    // //     console.log(nftCollectionName);
    // //     console.log(ele); 
    // //    sendMessage(`По имени коллекции title: ${ele.title} ${ele.amount}_$ productId: ${ele.productId}`);

    // //    process.exit(0)

    // //    }
   
      

    // });

}

function getIP(agent) {
    axios.get('https://api.ipify.org', { httpsAgent: agent }).then(res=> {
        console.log('PROXY IP^ ' + res.data);
    }).catch(e=> {
        console.log(e);
    })
}
function sendMessage(message) {
    console.log(message);
    techbicaleventTelegram(
        1,
        `Нашли ${message}`,
        "....."
      );
}
module.exports = { getInfoBinNFTMysteryBox, init }
