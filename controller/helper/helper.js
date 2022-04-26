const { default: axios } = require("axios");
const tunnel = require("tunnel");


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
};

function proxyInit(proxy) {
    try {
        let proxyArray = proxy.split(":", 4);

        return { host: proxyArray[0], port: proxyArray[1], proxyAuth: `${proxyArray[2] + ':' + proxyArray[3]}` }

    } catch (e) {
        console.log(e);
        console.log(proxy);
        process.exit(1)
    }


};
async function getIP(agent) {
    await axios.get('https://api.ipify.org', { httpsAgent: agent }).then(res => {
        console.log('PROXY IP^ ' + res.data);
    }).catch(e => {
        console.log(e);
    })
};

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function initAgent(proxyOptions) {
    let agent = tunnel.httpsOverHttp({
        proxy: proxyOptions,
        rejectUnauthorized: false,
    });
    return agent
}

const removeDuplicateItems = arr => [new Set(arr)];

function delDublicateProxy() {
    proxy.forEach((ele, i) => {
        let filter = proxy.filter(x => x == ele);
        if (filter.length > 1) {
            proxy.splice(i, 1);
        }

    });
}

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const helper = { shuffle, proxyInit, getIP, uuid, getRandomInt, initAgent, removeDuplicateItems, timeout, delDublicateProxy }


module.exports = helper