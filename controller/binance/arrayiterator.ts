const helper = require('./../helper/helper');

type proxyType = string

type arrayProxy = Array<string>
// interface arrayProxy {
//     [index: number]: string;
//     length: number; // ok, length is a number
//     forEach(callback: (f: proxyType, i: number) => void) : void;
//     splice(f: number, i: number) : void;
//     filter(callback: (f: proxyType, i: number) => void) : arrayProxy;
// }
let proxyLength: number;

let proxy: arrayProxy;

function setConstant(arrayProxy:arrayProxy): void {
    proxyLength = arrayProxy.length;
    proxy = arrayProxy;
}

const iterator = (proxy:arrayProxy) => {
    const arrayIterator = (arr: arrayProxy) => ({
        [Symbol.asyncIterator]() {
            let i = arr.length;
            //   console.log(i);
            return {
                index: 0,
                next() {
                    console.log('=========================== ' + this.index + ' index iterator =================================================');
                    if (this.index < proxyLength) {
                        //   console.log(this.index, arr.length);
    
                        return awaitArray(arr[this.index++], --i);
    
                    } else {
                        return { done: true }
    
                    }
    
                }
            }
        }
    })
    type tickIterator = valInterator | doneInterator;

    interface valInterator {
        value: proxyType;
    };
    interface doneInterator {
        done: boolean;
    };
   const awaitArray = (val:proxyType, length:number): Promise<tickIterator> => {
        let integer = 0; // предохранитель от бесконечной рекурсии
        return new Promise((resolve) => {
            function recursion(): Promise<tickIterator> {
                return new Promise((resolve) => {
                    if (length != proxyLength && length > 0) {
    
                        helper.timeout(1500).then(() => {
                            integer++
                            if (integer > 150) {
                                console.log('leng != length ' + length, proxyLength);
                                proxyLength = proxy.length;
    
    
                            }
                            if (length > proxyLength) {
                                proxy.forEach((ele: proxyType, i: number) => {
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
                recursion().then((res: tickIterator) => {
                    resolve(res)
                })
            }, 50);
    
    
    
        })
    }
}

module.exports = {
    iteratorInit(array: arrayProxy, arrayStatic: arrayProxy) {
        setConstant(arrayStatic);

        return iterator(array)


    }
}

