const {helper} = require('../helper/helper');
// const { proxy } = require("../../proxy_list");
let proxyLength;

let proxy;

function setConstant(arrayProxy) {
    proxyLength = arrayProxy.length;
    proxy = arrayProxy;
}

const arrayIterator = (arr) => ({
    [Symbol.asyncIterator]() {
        let i = arr.length;
          console.log(i);

        return {
            index: 0,
            next() {
                console.log('=========================== ' + this.index + ' index iterator =================================================');
                if (this.index == 0) {
                    //   console.log(this.index, arr.length);

                    return awaitArray(arr[this.index], i);

                } else if (this.index < proxyLength) {
                    return awaitArray(arr[this.index++], --i);


                }
                else {
                    return { done: true }

                }

            }
        }
    }
});

const awaitArray = (val, length) => {
    let integer = 0; // предохранитель от бесконечной рекурсии
    return new Promise((resolve) => {
        function recursion() {
            return new Promise((resolve) => {
                if (length != proxyLength && length > 0) {

                    helper.timeout(1500).then(() => {
                        integer++
                        // console.log('leng != length ' + length, proxyLength);

                        if (integer > 550) {
                            console.log('leng != length ' + length, proxyLength);
                            proxyLength = proxy.length;


                        }
                        if (length > proxyLength) {
                            proxy.forEach((ele, i) => {
                                let filter = proxy.filter(x => x == ele);
                                if (filter.length > 1) {
                                    proxy.splice(i, 1);
                                }

                            });
                        }



                        recursion().then((res) => {
                            resolve(res)
                        })
                    })


                } else if (length < 0) {
                    console.log('=========================leng < 0=========================');
                    integer = 0;

                    resolve({ done: true })

                } else {
                    console.log('=====!===!=========!===done: false====!=!=========!=======!==========');
                    integer = 0;

                    resolve({ value: val, done: false })
                }
            })


        };
        setTimeout(() => {
            recursion().then((res) => {
                resolve(res)
            })
        }, 502);



    })
}

module.exports = {arrayIterator, setConstant}

