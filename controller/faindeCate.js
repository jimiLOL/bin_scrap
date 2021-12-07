const ShemaCybercat = require('../model/cybercat.js')
const binanceIdProduct = require('../model/binanceIdProduct');
const { sendInfoTelegram, techbicaleventTelegram } = require("../controller/sendTelegram");


function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

async function filterCat(i) {
    ShemaCybercat.find({mystic: i}, (err, call) => {
        if (err) console.log('Ошибка получения ' + i);
        if (call) {
            console.log(call.length + ' ShemaCybercat содержит');
            call.forEach((element, index) => {
                
                    binanceIdProduct.findOne({tokenId: element.id, status: 1}, (err, callback) => {
                      
                        if (callback) {
                       
                        if (callback.status == 1 && callback.amount <= 300 || element.mystic > 2) {
                         
                        if (err) console.log('Ошибка получения binanceIdProduct');
                        if (callback) {
                            setTimeout(() => {
                                sendInfoTelegram(`${element.name}\n mystic ${i}\nprice: ${callback.amount}\nhttps://www.binance.com/en/nft/goods/detail?productId=${callback.productId}&isProduct=1`)
                            }, 800*index);
                            binanceIdProduct.findOneAndUpdate({productId: callback.productId}, {$set:{mystic: i}}, (err, call)=>{
                                if (err) console.log('Ошибка обновления binanceIdProduct');
                                if (call) console.log('Обновили mystic в binanceIdProduct');
                            })
                          
                            
                        }
                    
                }
            }
                    })
                
                
            });
           
        }
    })
}


module.exports = {filterCat }