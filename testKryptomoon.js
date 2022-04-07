require("dotenv/config");
const Web3 = require("web3");
const Contract = require('web3-eth-contract');
const { default: axios } = require("axios");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3ALCHEMY = createAlchemyWeb3(process.env.ALCHEMY_URL);

// const ProviderEngine = require('web3-provider-engine')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js');
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');

const WalletSubprovider = require('web3-provider-engine/subproviders/wallet');

const walletFactory = require('ethereumjs-wallet');

// const WalletSubprovider = require('ethereumjs-wallet').providerEngine
// const WalletSubprovider = require('ethereumjs-wallet/provider-engine')

let privat='0940e5a0a8d1f5b26638671f7e91388c6ba689a86c45361f1d71b8804d439dc2'

var privateKeyBuffer = new Buffer(privat, "hex")
var myWallet = walletFactory['default'].fromPrivateKey(privateKeyBuffer);
const publicKey = myWallet.getPublicKeyString();
console.log('====\npublicKey - ' + publicKey + '\n====');
// const address = myWallet.getAddressString().toString('hex');
// console.log('=====\naddress - ' + address + '\n====');

 

const contractAddress = require('./contractadressKryptomon/contractAddress');
const contractAbiV4Json = require("./abiKryptomon/contractAbiV4Json");
const KMONFTV2 = require("./abiKryptomon/NewContractAbiV4Json");
const merkleAbi = require('./abiKryptomon/merkleAbi.json');
const erc721 = require('./abiKryptomon/ERC721Abi');
const RedeemNFTABI = require('./abiKryptomon/RedeemNFT');
const KMONTokenAbi = require('./abiKryptomon/KMONToken');

// console.log(contractAbiV4Json);


const MnemonicWalletSubprovider = require("@0x/subproviders")
    .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");
const { response } = require("express");

const MNEMONIC = process.env.MNEMONIC;
const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
    mnemonic: MNEMONIC,
    baseDerivationPath: BASE_DERIVATION_PATH,
});


const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: 'https://bsc-dataseed1.binance.org:443'
});



const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(new FixtureSubprovider({
    web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
    net_listening: true,
    eth_hashrate: '0x00',
    eth_mining: false,
    eth_syncing: true,
  }))
  
  // cache layer
//   providerEngine.addProvider(new CacheSubprovider())
  
  // filters
//   providerEngine.addProvider(new FilterSubprovider())
  
  // pending nonce
//   providerEngine.addProvider(new NonceSubprovider())
  
  // vm
//   providerEngine.addProvider(new VmSubprovider())
providerEngine.addProvider(mnemonicWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
// providerEngine.addProvider(new WalletSubprovider(myWallet, {}));
providerEngine.on('error', function(err){
    // report connectivity errors
    console.error(err.stack)
  })
providerEngine.start();

const web3 = new Web3(providerEngine)
// const web3 = new Web3('https://bsc-dataseed1.binance.org:443')

let kryptomons = [];
let typeFormatted = ["Fire", "Water", "Ice", "Ground", "Air", "Electro", "Ghost", "Grass"]

// const newContract = new web3.eth.Contract(KMONFTV2, '0x04b0f7d5cb2ce4688497f2525748fb7a9affa394');
const newContract = new web3.eth.Contract(contractAbiV4Json, contractAddress.contractAddress);
const merkle = new web3.eth.Contract(merkleAbi, contractAddress.merkleClaimAddress2);
const erc721_1 = new web3.eth.Contract(erc721, '0xC4bdb04878e1B0c872bC1152751a16a968001a00');
const erc721_2 = new web3.eth.Contract(erc721, '0x9C4E29a6bC9759219b79E31cAcb7d5c526dAb007');
const contractRedeemNFTInstance = new web3.eth.Contract(RedeemNFTABI, '0x1a1E83b6F7C39c17Bb507fbBA609e148ab50C31A');
const contractRedeemNFTInstance2 = new web3.eth.Contract(RedeemNFTABI, '0xf32e8288F1bDC30EDb7d7CABfdcAFe669E7845f8');
const KMONTokenContarct = new web3.eth.Contract(KMONTokenAbi, '0xc732b6586a93b6b7cf5fed3470808bc74998224d');


let ownedPartnerNFTs = [];
let ownedPartnerNFTs2 = [];
 

async function startTest() {
   
    var accounts = await web3.eth.getAccounts();
    // var accounts = web3.eth.accounts.privateKeyToAccount('0940e5a0a8d1f5b26638671f7e91388c6ba689a86c45361f1d71b8804d439dc2');
    console.log(accounts);
    let account = accounts[0].toString('hex');

    let gas = await web3.eth.getGasPrice();
    console.log(gas);

    // gas = web3.utils.toBN(gas)
    // console.log(gas);

    // console.log(web3.utils.toWei(gas));
    // erc721_2.options.gasPrice = gas;
    // let payload = { 
    //     id: function () {return 'ok'}
    // };
    // // console.log(payload.id);

    // const migrationDataOld = await axios.post('https://api-yt9bz.ondigitalocean.app/kryptomons-meta/9793/name', payload).then(res =>{
    //     console.log('payload');
    //     console.log(res.data);
    //      return res.data

    //    }).catch(e=> {
    //        console.log(e);
    //    });


    const balance = await KMONTokenContarct.methods.balanceOf(accounts[0]).call();
    console.log(balance + ' - KMON');

    // Promise.all([approveBNFT(), approveBNFT2()]).then(()=> {
        

    // }).catch(e=> {
    //     console.log(e);
    // })
    // checkIsApproved().then(() => {
    //     Promise.all([checkBNFTClaim(), checkBNFTClaim2()])


    // });
    getKryptomons();

    



    function getKryptomons() {
        newContract.methods.ownedKryptomons().call({
            from: account,
        }).then((receipt) => {
            console.log(receipt); // возвращает пустой массив, хз почему и хз что ожидать в массиве;
            receipt.forEach(element => {
                // getKryptomonDetails(element)


            });
        })

    }


    // await getKryptomonDetails(211500002259)()
    // console.log(kryptomons);
    // parseKryptomonDetails(accounts)
    // console.log(newContract.methods);

    // const userBalance_1 = parseInt(await erc721_1.methods.balanceOf(account).call());
    // const userBalance_2 = parseInt(await erc721_2.methods.balanceOf(account).call());
    // console.log(userBalance_1);
    // console.log(userBalance_2);
    async function approveBNFT() {
        return new Promise((resolve, reject) => {
            resolve()
            // erc721_1.methods.setApprovalForAll(contractRedeemNFTInstance._address, true, ).send({
            //     from: account,
            //     gas: gas
            //   }).then(()=>{
            //       console.log('Approve approveBNFT');
            //       resolve()
            //   }).catch(e=> {
            //     console.log(e);
            // });
        })
     
        
      }
    
      async function approveBNFT2(tokenId) {
          console.log(account);
          return new Promise(async (resolve, reject) => {
            // const hbh = await erc721_2.methods.approve(contractRedeemNFTInstance2._address, tokenId);
            // console.log(hbh);
            // console.log('Approve approveBNFT2');

            // resolve()
            
              
            erc721_2.methods.approve(contractRedeemNFTInstance2._address, tokenId).send({
                from: account
                // gas: gas
              }).then(()=>{
                  console.log('Approve approveBNFT2');
            // redeemBNFT2();

                  resolve()
              }).catch(e=> {
                  console.log(e);
              });
          })
        
      
        
      }

    function checkBNFTClaim() {
        return new Promise(async (resolve, reject) => {
            const userBalance = parseInt(await erc721_1.methods.balanceOf(account).call());

            if (userBalance > 0) {
                //   this.ownsPartnerNFT = true;
                for (let i = 0; i < userBalance; i++) {
                    const tokenId = await erc721_1.methods.tokenOfOwnerByIndex(account, i).call();
                    // call the api
                    const address = erc721_1._address;
                    ownedPartnerNFTs.push(tokenId);
                    const result = await axios.get(`https://api-yt9bz.ondigitalocean.app/redeem/${address}/${tokenId}`);

                    // const result = await fetch(`https://api-yt9bz.ondigitalocean.app/redeem/${address}/${tokenId}`)
                    console.log(result?.data);
                    if (i == userBalance - 1) {
                        console.log('resolve checkBNFTClaim');
                        // redeemBNFT();
                        resolve()


                    }

                }
            } else {
                console.log(userBalance);

                resolve()
            }

        })

    };

    async function checkBNFTClaim2() {
        return new Promise(async (resolve, reject) => {
            const userBalance = parseInt(await erc721_2.methods.balanceOf(account).call());

            if (userBalance > 0) {
                //   this.ownsPartnerNFT2 = true;
                for (let i = 0; i < userBalance; i++) {
                    const tokenId = await erc721_2.methods.tokenOfOwnerByIndex(account, i).call();
                    // call the api
                    const address = erc721_2._address;
                    ownedPartnerNFTs2.push(tokenId);
                    const result = await axios.get(`https://api-yt9bz.ondigitalocean.app/redeem/${address}/${tokenId}`);
                    // const result = await fetch(`https://api-yt9bz.ondigitalocean.app/redeem/${address}/${tokenId}`)
                    console.log(result?.data);
                    if (i == userBalance - 1) {
                        console.log('resolve checkBNFTClaim2');
                        // approveBNFT2(tokenId)


                        resolve()


                    }
                }
            } else {
                console.log(userBalance);
                resolve()
            }

        })

    };

    async function checkIsApproved() {
        return new Promise(async (resolve, reject) => {
            let isApproved = await erc721_1.methods.isApprovedForAll(account, contractRedeemNFTInstance._address).call();
        console.log('==========isApproved============');
            console.log(isApproved);
        console.log('==========isApproved============');

            checkIsApproved2()
            resolve()


        })

    };

    async function checkIsApproved2() {
        let isApproved2 = await erc721_2.methods.isApprovedForAll(account, contractRedeemNFTInstance2._address).call();
        console.log('==========isApproved2============');
        console.log(isApproved2);
        console.log('==========isApproved2============');

    };

    async function redeemBNFT() {
        // this.isLoadingBNFT = true;
        const tokenId = ownedPartnerNFTs[ownedPartnerNFTs.length - 1];
        const nftAddress = erc721_1._address;
        contractRedeemNFTInstance.methods.redeem(nftAddress, tokenId).send({
            from: account
        }).then(() => {
            getKryptomons();
        }).catch(() => {
            //   this.isLoadingBNFT = false;
        });
    }

    async function redeemBNFT2() {
        // this.isLoadingBNFT = true;
        const tokenId = ownedPartnerNFTs2[ownedPartnerNFTs2.length - 1];
        console.log(tokenId);
        const nftAddress = erc721_2._address;
        console.log(nftAddress);
        const GasPrice = await web3.eth.getGasPrice();
        // const minimumGasPrice = block.minimumGasPrice;
        console.log('GasPrice ' + GasPrice);
        console.log(web3.utils.toWei(GasPrice));
        contractRedeemNFTInstance2.methods.redeem(nftAddress, tokenId).send({
          from: account,
          gasPrice: GasPrice
        }).then(()=>{
            console.log('getKryptomons');
          getKryptomons();
        }).catch((e)=>{
            console.log(e);
        //   this.isLoadingBNFT = false;
        });
    }

    // let post = { address: account };

    // axios.post("https://api.kryptomon.co/merkle/checkAddressListed.php", post).then(r => {
    //     console.log('=========checkAddressListed===========');
    //     console.log(r.data);
    //     console.log('=========checkAddressListed===========');

    // })






    function getKryptomonDetails(id) {
        return newContract.methods.getKryptomonDetails(id).call({
            from: account,
        }).then((kryptomon) => {
            kryptomons.push({
                id: kryptomon[0],
                genes: kryptomon[1],
                matron: kryptomon[2],
                sire: kryptomon[3],
                timeBorn: kryptomon[4],
                status: kryptomon[7],
                timeHatched: kryptomon[8],
                timeToHatch: kryptomon[9],
                extra_data: kryptomon[6]
            });
            console.log(kryptomons);
            kryptomonImage();
        }).catch((err) => {
            console.log(err, 'err');
        });
    }

};
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
};
function getHatchingDate(kryptomon) {
    let hatchingDateInUnix = parseInt(kryptomon.timeBornUnix) + 0;
    return new Date((hatchingDateInUnix + 20) * 1000);
}

function kryptomonImage(accounts) {
    for (let i = 0; i < kryptomons.length; i++) {
        let genes = kryptomons[i].genes;
        let typeDraft = [];
        let type = [];
        let c = 0;
        for (let i = 0; i < 8; i++) {
            let sum = parseInt(genes[c]) * parseInt(genes[c + 1]);
            c = c + 2;
            typeDraft.push(sum);
        }
        let typeSelected = indexOfMax(typeDraft);
        let kryptomon = {};
        kryptomon.type = typeSelected;
        kryptomon.talent = typeDraft[typeSelected];
        kryptomon.typeFormatted = typeFormatted[typeSelected];
        if (genes[19] > genes[20] * 1.1) {
            kryptomon.speciality = "attack";
        }
        else if (genes[20] > genes[19] * 1.1) {
            kryptomon.speciality = "defense";
        }
        else {
            kryptomon.speciality = "balance";
        }
        if (genes[22] == 0) {
            kryptomon.super = false;
            var img_selected = kryptomon.speciality;
        }
        else {
            img_selected = "super";
            kryptomon.super = true;
        }
        kryptomon.unfreezable = kryptomons[i].extra_data[0];
        kryptomon.id = kryptomons[i].id;
        kryptomon.generation = genes[genes.length - 1];
        kryptomon.timeBornUnix = kryptomons[i].timeBorn;
        //console.log(kryptomon.unfreezable)
        if (kryptomon.unfreezable == 1) {
            kryptomon.image =
                "./assets/img/top_special/" +
                kryptomon.typeFormatted +
                "/" +
                img_selected +
                ".png";
        }
        else {
            kryptomon.image =
                "./assets/img/" +
                kryptomon.typeFormatted +
                "/" +
                img_selected +
                ".png";
        }
        kryptomon.iconImage =
            "./assets/img/icons/" + kryptomon.typeFormatted.toLowerCase() + ".svg";
        let personality = {};
        personality.Constitution = genes[24];
        personality.Affection = genes[27];
        personality.Crazyness = genes[28];
        personality.Instinct = genes[29];
        personality.Hunger = genes[30];
        personality.Laziness = genes[31];
        personality.Braveness = genes[32];
        personality.Smart = genes[33];
        personality.Ego = genes[35];
        kryptomon.personality = personality;
        kryptomon.generation = genes[genes.length - 1];
        kryptomon.id = kryptomons[i].id;
        // let postRender = {
        //     id: kryptomon.id,
        //     network: this.appComponent.contractService.networkName
        // };
        // this.http.post("https://api.kryptomon.co/json/kryptomon/checkRender.php", postRender).subscribe((item) => {
        //     kryptomon.rendered = item.status;
        // });
        kryptomon.hatchingDate = getHatchingDate(kryptomon);
        kryptomon.isReadyToHatch = kryptomon.hatchingDate < new Date();
        kryptomons[i].data = kryptomon;
        kryptomon.generation = '8';
        kryptomon.personality.Constitution = '90';
        personality.Affection = '95';
        personality.Crazyness = '95';
        personality.Instinct = '98';
        personality.Hunger = '89';
        personality.Laziness = '91';
        personality.Braveness = '92';
        personality.Smart = '98';
        personality.Ego = '99';
        let post = {
            meta: kryptomon,
            dna: genes,
            network: 'BinanceSmartProd'
        };
        console.log(kryptomon);
        kryptomon.data = {};
        // saveName(kryptomon, 'xyi', accounts)
        axios.post('https://api.kryptomon.co/json/kryptomon/checkMeta.php', post).then(res => {
            console.log('checkMeta');
            console.log(res.data);
            axios.post('https://api.kryptomon.co/json/kryptomon/save_meta.php', post).then(r => {
                console.log('save_meta');
                console.log(r.data);
                axios.get(`https://api.kryptomon.co/json/kryptomon/meta/${kryptomon.id}`).then(response => {
                    console.log(response.data);
                })
            })
        });

    }

}

function saveName(kryptomon, kryptomonName, accounts) {


    var text = "Name my Kryptomon(" + kryptomon.id + ") " + kryptomonName;
    var msg = web3.utils.utf8ToHex(text);
    var from = account;
    var params = [msg, from];
    var method = 'personal_sign';
    var parent = this;
    var name = kryptomonName;
    var network = 'BinanceSmartProd';
    var kryptomon = kryptomon;
    kryptomon.data.name = name;
    let attributes = [
        { trait_type: 'Element Type', value: 'Air' },
        { trait_type: 'Speciality', value: 'Defense' },
        { trait_type: 'Super', value: 'Normal' },
        { trait_type: 'Affection', value: 82, max_value: 100 },
        { trait_type: 'Braveness', value: 57, max_value: 100 },
        { trait_type: 'Constitution', value: 55, max_value: 100 },
        { trait_type: 'Craziness', max_value: 100, value: 35 },
        { trait_type: 'Hunger', value: 56, max_value: 100 },
        { trait_type: 'Instinct', value: 15, max_value: 100 },
        { trait_type: 'Smart', value: 20, max_value: 100 },
        {
            trait_type: 'Element Starting Talent',
            value: 522,
            max_value: 1000
        },
        { trait_type: 'Laziness', value: 21, max_value: 100 },
        { trait_type: 'Unfreezable', value: 'No' },
        { display_type: 'number', trait_type: 'Generation', value: 10 },
        {
            display_type: 'date',
            trait_type: 'Birthday',
            value: '08-02-2022'
        }
    ];
    kryptomon.data.attributes = attributes;

    web3.currentProvider.sendAsync({
        method,
        params,
        from,
    }, function (err, result) {
        if (err) {
            kryptomon.data.name = parent.oldKryptomonName;
            // parent.kryptomonName = parent.oldKryptomonName;
            return console.error(err);
        }
        if (result.error) {
            kryptomon.data.name = parent.oldKryptomonName;
            // parent.kryptomonName = parent.oldKryptomonName;
            return console.error(result.error);
        }
        console.log('PERSONAL SIGNED:' + JSON.stringify(result.result));
        let post = {
            id: kryptomon.id,
            name: name,
            attributes: attributes,
            network: network,
            signature: result.result,
            enable: true
        };
        // console.log(post);
        axios.post('https://api-yt9bz.ondigitalocean.app/kryptomons-meta/9793/name', post).then(r => {
            console.log(r.data);
            axios.get(`https://api.kryptomon.co/json/kryptomon/meta/${kryptomon.id}`).then(response => {
                console.log(response.data);
            })
        })
        // parent.http.post(this.appComponent.contractService.apiEndPoint + "/kryptomons-meta/" + post.id + "/name", post).subscribe((response) => {
        //     kryptomon.data.name = name;
        //     parent.oldKryptomonName = name;
        // });
    });



}

module.exports = { startTest }