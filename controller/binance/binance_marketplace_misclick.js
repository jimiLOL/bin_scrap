// модуль парсинга маркет плейса
const { default: axios } = require("axios");
const tunnel = require("tunnel");
const {getProductDetail} = require('./get_productDetali');
const { proxy } = require("../../proxy_list");
const { UA } = require("../../ua");
const helper = require('./../helper/helper');
let {getNewHeaders} = require('./getHeaders');
const proxyLength = proxy.length;
// let agent = tunnel.httpsOverHttp({
//     proxy: {
//         host: "127.0.0.1",
//         port: 8867,
//         // proxyAuth: "1765d78a21:7518c2dea1",
//     },
//     rejectUnauthorized: false,
// });

//   proxyOptions = {
//     host: proxyArray[0],
//     port: proxyArray[1],
//     proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}`,
// };
// agent = tunnel.httpsOverHttp({
//     proxy: proxyOptions,
//     rejectUnauthorized: false,
// });



let headers = {
    accept: "*/*",
    "accept-encoding":"gzip",
    "accept-language":
      "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5",
    clienttype: "web",
    "content-type": "application/json",
    lang: "en",
    "sec-ch-ua":
      '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    Host:"www.binance.com"
  };
  



let header;



function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
 
  const arrayIterator = arr => ({
    [Symbol.asyncIterator]() {
      let i = arr.length;
    //   console.log(i);
      return {
          index:0,
       next() {
           if (this.index < arr.length) {
    //   console.log(this.index, arr.length);

            return awaitArray(arr[this.index++], --i);

           } else {
            return { done: true }
               
           }
 
        }
      }
    }
  })
  awaitArray = (val, length) => {
    //   console.log(val, length);
    //   process.exit(0)
      return new Promise((resolve) => {
         function recursion() {
             return new Promise((resolve) => {
                if (proxy.length != proxyLength && length > 0) {
                    // console.log('leng != length ' + proxy.length, length);
                    // resolve({ value: val, done: false })
                   timeout(200).then(() => {
                    //    proxy.pop()
                       
                        recursion().then((res)=> {
                            resolve(res)
                        })
                    })
    
                  
                } else if (length < 0) {
                    console.log('=========================leng < 0=========================');
                    resolve({ done: true })
    
                } else {
                    console.log('=====!===!=========!===done: false====!=!=========!=======!==========');
    
                    resolve({ value: val, done: false })
                }
             })
          
         
        };
        setTimeout(() => {
            recursion().then((res) => {
                // console.log('res');
                resolve(res)
            })
        }, 5000);
      
          

      })
  }
 


async function getInfoBinNFT() {
    header = getNewHeaders(headers);
    // recursion()
    const layerList = await axios.get('https://www.binance.com/bapi/nft/v1/public/nft/layer-search?keyword=', { headers: headers}).then(res=> {
    return res.data.data
});
console.log(layerList.length);
let asd = 0;

(async () => {
    for await (const p of arrayIterator(proxy)) {
      //   console.log(layer);
      asd++

      console.log(p);
      if (asd == 20) {
        //   process.exit(0)
    //   proxy.shift()
    // proxy.length = 200;

      }
      
    }
  })();

layerList.forEach((layer, i) => {
    let body = {
        currency: (function() {return "BUSD"})(),
        mediaType: "",
        tradeType: "",
        // amountFrom: "0.1",
        // amountTo: "2",
        collectionId: '',
        categorys: [],
        keyword: "",
        // orderBy: "list_time", // когда размещенно
        // orderType: 1, // статус.
        page: 1,
        rows: 100,
        productIds: []
    };
    body.collectionId = layer.layerId;
    helper.shuffle(proxy);
    helper.shuffle(UA);
    let var_break = false;



    
    (async () => {
        let index = 0;
        for await (const proxyVar of arrayIterator(proxy)) {
            index++
            // let proxyVar = proxy.slice(index-1, index)[0];
            console.log(proxyVar);
            // process.exit(0)
            if (proxyVar == undefined) {
                break
            }
      
            const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = helper.proxyInit(proxyVar);
            console.log('Proxy lenght ' + proxy.length + ' index ' + index);
            proxy.splice(index-1, 1);
            let proxyOptions = {
                host: proxyHost,
                port: portHost,
                proxyAuth: proxyAuth,
                headers: {
                    'User-Agent': UA[index]
                  },
            };
            let agent = tunnel.httpsOverHttp({
                proxy: proxyOptions,
                rejectUnauthorized: false,
            });
    
            body.page = index;
            header["User-Agent"] = UA[index];
            // let t = helper.uuid();
            // header['x-ui-request-trace'] = t;
            // header['x-trace-id'] = t;
       
    
            let data = new Date().getTime();
           await timeout(5000*index).then(() => {
               if (!var_break) {
                axios.post('https://www.binance.com/bapi/nft/v1/friendly/nft/product-list', body, { headers: header, httpsAgent: agent }).then(res => {
                    console.log(res.status + ' ' + index + ' total= ' + res.data.data.total);

                    console.log('Send proxyVar ' + proxyVar);
              
                    arrayIteration(res.data.data.rows, proxyVar);
                    let n = res.data.data.total / 100;
                    console.log(Math.ceil(n));
                    let newData = new Date().getTime();
                    console.log(`Date cycle^ ${newData - data} ms`);
                    if (Math.ceil(n) == index) {
                        var_break = true
                    } // останавливаем итерацию
        
                    return Math.ceil(n)
                }).catch(e => {
                    console.log('Error');
                    proxy.push(proxyVar)
            console.log('Proxy lenght ' + proxy.length);

                    console.log(e.code);
                    console.log(e?.response?.data);
                    console.log(layer);
                    console.log(body);

                    // helper.getIP(agent).then(() => {

                    //     process.exit(1)
          
                    //   });
                    if (e?.response?.statusText != undefined) {
                    console.log(e?.response?.statusText);
        
        
                    } else {
                        // console.log(e);
                    }
                    var_break = true;
                    // process.exit(1)
                })
               }
         
           });
           if (index == 50|| var_break) {
               console.log('===========break==============');
            var_break = false;
            break
        }
            
            
    
        }
    })()


    

    
});



    // let num = await initNum();
    // let num = 100
  

}

async function initNum() {
    const number = await axios.post('https://www.binance.com/bapi/nft/v1/friendly/nft/product-list', body, { headers: header }).then(res => {
        let n = res.data.data.total / 100;
        return Math.ceil(n)
    }).catch(e => {
        // console.log('Error');
        console.log(e?.response?.statusText);
    });
    return number
}
let cloneProxySet;
function arrayIteration(array, proxySet) {
    if (proxySet != undefined) {
        cloneProxySet = Object.assign({}, {proxySet: proxySet});

    }
 


   
array.forEach((ele, i) => {
    setTimeout(() => {
    let randomIndex = helper.getRandomInt(0, proxy.length);
    console.log('Proxy length ' + proxy.length + ' randomIndex ' + randomIndex + ' ' + proxy[randomIndex] + ' ' + cloneProxySet.proxySet);

   
    const { host: proxyHost, port: portHost, proxyAuth: proxyAuth } = proxy[randomIndex] == undefined ?  helper.proxyInit(cloneProxySet.proxySet) : helper.proxyInit(proxy[randomIndex]);
    if (proxy[randomIndex] == undefined) {
        proxy.push(cloneProxySet.proxySet)
    } else {
        proxy.splice(randomIndex, 1);

    };

    let proxyOptions = {
        host: proxyHost,
        port: portHost,
        proxyAuth: proxyAuth,
        headers: {
            'User-Agent': UA[randomIndex]
          },
    };
    let agent = tunnel.httpsOverHttp({
        proxy: proxyOptions,
        rejectUnauthorized: false,
    });
 
        header = getNewHeaders(headers);
    getProductDetail(ele, agent, header).then(() => {

        proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`); // возвращаем прокси в обойму на дочернем цикле


        
        

    }).catch((e)  => {
        // process.exit(1)
        proxy.push(`${proxyOptions.host}:${proxyOptions.port}:${proxyOptions.proxyAuth}`);


        console.log(e);
        // arrayIteration(array)
    })
        
    }, 200*i);
    
    
});

proxy.push(cloneProxySet.proxySet);// вернули прокси из глобального цикла. возвращаем именно в этот момент, что бы наш итерратор жадл весь цикл
proxy.forEach((ele, i) => {
let filter = proxy.filter(x => x == ele);
if (filter.length > 1) {
    proxy.splice(i, 1);
}
    
});

console.log('Function arrayIteration END\nProxy length ' + proxy.length);


}

module.exports = { getInfoBinNFT }