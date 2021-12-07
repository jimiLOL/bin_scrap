const { default: axios } = require("axios");
const ShemaCybercat = require("../model/cybercat.js");
const binanceIdProduct = require("../model/binanceIdProduct");
const mongoose = require("mongoose");
const tunnel = require("tunnel");

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "88.82.93.186",
    port: 43937,
    proxyAuth: "1765d78a21:7518c2dea1",
  },
  rejectUnauthorized: false,
});

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cat() {
  let reak = false;
  for (let index = 1; index < 40; index++) {
    if (reak) {
      console.log("Break");
      break;
    }
    binanceIdProduct
      .find({}, (err, callback) => {
        if (err) console.log("ОШибка выборки на цикле " + index);
        if (callback) {
          callback.forEach(async (element, index) => {
            await timeout(3000 * index).then(() => {
              cybercatGetalphamarketplace(element.tokenId);
            });
          });
        }
        if (callback.length == 0) {
          reak = true;
        }
      })
      .limit(50)
      .skip(index * 50);
  }
}
// (async () => {

// })()

async function cybercatGetalphamarketplace(id) {
  const header = {
    'Host':'marketplace.cybercat.world',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',
'Accept':'application/json, text/plain, */*',
'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
'Accept-Encoding':'gzip',
'chainId':56,
'Connection':'keep-alive',
'Referer':`https://marketplace.cybercat.world/detail/${id}`,
'Cookie':'_ga_6928PS4B79=GS1.1.1638388318.5.0.1638388318.0; _ga=GA1.1.1260871848.1638299241; AWSALBTG=5sNH1jnfvUJxmdwTDoPpwlTCYp2ReATvv4WzNrXHPbzGkp0pBdYLzjmC3AT87YxVl0i7myRYhyLD8yNMNxOcY7wthPTQdWW2Jhlry9ZQznBdl/9EvBzCEnWx5J155JtPcwsBVTLgCGgrG4bwpIONUJV9PSdsnN07or0KM7m7/FqMJKzZy1A=; AWSALBTGCORS=5sNH1jnfvUJxmdwTDoPpwlTCYp2ReATvv4WzNrXHPbzGkp0pBdYLzjmC3AT87YxVl0i7myRYhyLD8yNMNxOcY7wthPTQdWW2Jhlry9ZQznBdl/9EvBzCEnWx5J155JtPcwsBVTLgCGgrG4bwpIONUJV9PSdsnN07or0KM7m7/FqMJKzZy1A=; AWSALB=c2wdCUGNa7oEpjgVs173sYFRAa7piwyI6PyPFUnsBqMF3KUcMYQ2mnm/nuq6nzjP8wRSnkvmalt4YmG6pOznYMiJFlIbyfAr5WRlVF/vM0OscYxdmh2CKsZ/dPfr; AWSALBCORS=c2wdCUGNa7oEpjgVs173sYFRAa7piwyI6PyPFUnsBqMF3KUcMYQ2mnm/nuq6nzjP8wRSnkvmalt4YmG6pOznYMiJFlIbyfAr5WRlVF/vM0OscYxdmh2CKsZ/dPfr',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'same-origin'
  };

  axios
    .get(`https://marketplace.cybercat.world/mymps/public/cyberCat/${id}`, {
      headers: header,
      httpsAgent: agent,
    })
    .then((res) => {
      
      if (res.status == 502 || res.status == 502) {
        ShemaCybercat.findOneAndRemove({id: id}, (err, call)=> {
          if (err) console.log('ОШибка удаления');
          if (call) {
            console.log('Удлили ' + id);
          }
        })

      }
      let data = res.data.data;
      const newShemaCybercat = new ShemaCybercat({
        _id: new mongoose.Types.ObjectId(),
        id: data?.id,
        image: data?.image,
        battleClass: data?.battleClass,
        name: data?.name,
        genes: data?.genes,
        owner: data?.owner,
        birthDate: data?.birthDate,
        bodyShape: data?.bodyShape,
        sireId: data?.sireId,
        matronId: data?.matronId,
        stage: data?.stage,
        title: data?.title,
        breedCount: data?.breedCount,
        figure: data?.figure,
        parts: data?.parts,
        children: data?.children,
        parent: data?.parent,
        hp: data?.hp,
        morale: data?.morale,
        skill: data?.skill,
        speed: data?.speed,
        eyesId: data?.eyesId,
        earsId: data?.earsId,
        hornId: data?.hornId,
        backId: data?.backId,
        tailId: data?.tailId,
        mouthId: data?.mouthId,
        currentPrice: data?.currentPrice,
        suggestedPrice: data?.suggestedPrice,
        mystic: data?.mystic,
      });

      if (data == undefined) {
        ShemaCybercat.findOneAndRemove({ id: id }, (err, call) => {
          if (err) {
            console.log("Ошибка удаления");
          }
          if (call) {
            console.log("Удалили ShemaCybercat " + id);
            binanceIdProduct.findOneAndRemove(
              { tokenId: id },
              (err, callback) => {
                if (err) console.log("Ошибка удаления binanceIdProduct " + id);
                if (callback) {
                  console.log("Удалили binanceIdProduct " + id);
                }
              }
            );
          }
        });
      } else {
        ShemaCybercat.findOne({ id: data.id }, (err, call) => {
          if (err) console.log("ОШибка поиска");
          if (call) {
            ShemaCybercat.findOneAndUpdate(
              { id: data.id },
              {
                $set: {
                  id: data?.id,
                  image: data?.image,
                  battleClass: data?.battleClass,
                  name: data?.name,
                  genes: data?.genes,
                  owner: data?.owner,
                  birthDate: data?.birthDate,
                  bodyShape: data?.bodyShape,
                  sireId: data?.sireId,
                  matronId: data?.matronId,
                  stage: data?.stage,
                  title: data?.title,
                  breedCount: data?.breedCount,
                  figure: data?.figure,
                  parts: data?.parts,
                  children: data?.children,
                  parent: data?.parent,
                  hp: data?.hp,
                  morale: data?.morale,
                  skill: data?.skill,
                  speed: data?.speed,
                  eyesId: data?.eyesId,
                  earsId: data?.earsId,
                  hornId: data?.hornId,
                  backId: data?.backId,
                  tailId: data?.tailId,
                  mouthId: data?.mouthId,
                  currentPrice: data?.currentPrice,
                  suggestedPrice: data?.suggestedPrice,
                  mystic: data?.mystic,
                },
              },
              (err, callback) => {
                if (err) {
                  console.log(err);
                  console.log("Ошибка обнолвения " + data.id);
                }
                if (callback) console.log("Обновили " + data.id);
              }
            );
          } else {
            newShemaCybercat.save((err, cal) => {
              if (err) console.log("Ошибка сохранения " + data?.id);
              if (cal) console.log("Сохранили " + data.id);
            });
          }
        }).catch((e) => {
          console.log(e);
        });
      }
    }).catch((e) => {
      console.log(e);
    
    });
}

module.exports = { cat };
