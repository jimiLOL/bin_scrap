const { default: axios } = require("axios");
const tunnel = require("tunnel");
const { proxy } = require("./../proxy_list");
const { UA } = require("./../ua");
const {getNaemListNFT} = require("./../controller/getNftStat");
const num = 10 // итерациий
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
    size: 50,
    params: {
        // keyword: "",
        currency: "BUSD",
        // nftType: null,
        // amountFrom: "0.001",
        // amountTo: "3",
        setStartTime: new Date().getTime(),
        // setStartTime: (function() {return new Date().getTime()})(),
        // orderBy: "list_time",
        orderType: -1,
        // serialNo: null,
        tradeType: 0
    }
};
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function init() {
arrayNFT = await getNaemListNFT();

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

function getInfoBinNFTMysteryBox({ host: proxyHost, port: portHost, proxyAuth: proxyAuth }, i) {
    return new Promise((resolve, reject) => {
        // header["User-Agent"] = UA[i];
        // console.log(header);
        // let num = initNum();
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
            // body.page = index; // смена страницы -- не используем, просматриваем всегда первую страницу результатов
            let data = new Date().getTime();
          
            axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header, httpsAgent: agent }).then(res => {
                console.log(res.status + ' ' + index);
                // console.log(res.request);
                // process.exit(0)
                if (index >= Math.ceil(num / 2)) {
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

function initNum() {
    // const number = await axios.post('https://www.binance.com/bapi/nft/v1/public/nft/market-mystery/mystery-list', JSON.stringify(body), { headers: header }).then(res => {
    //     let n = res.data.data.total / 100;
    //     console.log(res.data.data.total);

    //     return Math.ceil(n)
    // }).catch(e => {
    //     // console.log('Error');
    //     console.log(e?.response?.statusText);
    // }); изначально я хотел перебрать все значения в базе @total@ теперь используем констануту num
    return 100
}

function arrayIteration(array) {
    array.forEach(ele => {
        // let da = new Date(ele.setStartTime);
        // console.log(ele);

       let wd = arrayNFT.filter(x=> x.title == ele.title && (x.minimum - x.minimum*0) >= ele.amount);
    //    if (wd.length > 0) {
    //     console.log(wd);
    //     console.log(ele);
    //    }
      

    });

}

function getIP(agent) {
    axios.get('https://api.ipify.org', { httpsAgent: agent }).then(res=> {
        console.log('PROXY IP^ ' + res.data);
    }).catch(e=> {
        console.log(e);
    })
}
module.exports = { getInfoBinNFTMysteryBox, init }
